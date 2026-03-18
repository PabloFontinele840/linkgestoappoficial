import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'npm:@supabase/supabase-js'
import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) throw new Error('Missing Authorization header')

    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') || ''

    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: authHeader } }
    })

    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) throw new Error('Unauthorized')

    const { message } = await req.json()
    const msg = message.toLowerCase()
    
    let responseText = "Desculpe, não entendi o comando. Tente algo como 'Criar OS: iPhone 11, tela quebrada, valor 250', 'Paguei 150 reais em peças', ou 'Como está meu faturamento?'."
    let actionType = 'none'

    // Simple intent matching since we are simulating the LLM
    if (msg.includes('criar') && (msg.includes('os') || msg.includes('ordem'))) {
      const valMatch = msg.match(/valor\s+(\d+)/)
      const value = valMatch ? parseInt(valMatch[1]) : 0
      
      const { error: insertError } = await supabase.from('service_orders').insert({
        user_id: user.id,
        reported_problem: message,
        status: 'Aberta',
        value: value,
        service_type: 'Balcão'
      })
      
      if (insertError) throw insertError
      responseText = "Ordem de serviço criada com sucesso com base nas suas informações."
      actionType = 'create_os'

    } else if (msg.includes('paguei') || msg.includes('despesa') || msg.includes('gasto')) {
      const valMatch = msg.match(/(?:paguei|despesa de|gastei)\s*(?:r\$)?\s*(\d+)/)
      const value = valMatch ? parseInt(valMatch[1]) : 0
      
      const { error: insertError } = await supabase.from('financial_transactions').insert({
        user_id: user.id,
        type: 'saida',
        status: 'pago',
        amount: value,
        description: message,
        classification: 'Variável',
        transaction_date: new Date().toISOString().split('T')[0]
      })

      if (insertError) throw insertError
      responseText = `Despesa de R$ ${value} registrada com sucesso em suas finanças.`
      actionType = 'add_expense'

    } else if (msg.includes('faturamento') || msg.includes('resumo') || msg.includes('vendas')) {
      const { data } = await supabase.from('financial_transactions')
        .select('amount, type')
        .eq('user_id', user.id)
        .eq('status', 'pago')
        
      const total = data?.filter(d => d.type === 'entrada').reduce((acc, curr) => acc + Number(curr.amount), 0) || 0
      responseText = `O seu faturamento total registrado no sistema (entradas pagas) é de R$ ${total.toFixed(2)}.`
      actionType = 'query_data'
    }

    // Log the interaction
    await supabase.from('ai_logs').insert({
      user_id: user.id,
      message: message,
      response: responseText,
      action_type: actionType
    })

    return new Response(JSON.stringify({ response: responseText, action: actionType }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})

