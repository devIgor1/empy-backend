export const getStatusMessage = (status: string) => {
  switch (status) {
    case "PAID":
      return "Pagamento aprovado com sucesso!"
    case "DECLINED_NO_LIMIT":
      return "Pagamento recusado por falta de limite no cartão."
    case "NOT_AUTHORIZED":
      return "Pagamento não autorizado pelo emissor."
    default:
      return "Ocorreu um erro no pagamento."
  }
}

// PAID - Pagamento aprovado com sucesso!
// DECLINED_NO_LIMIT - Pagamento recusado por falta de limite no cartão.
// NOT_AUTHORIZED - Pagamento não autorizado pelo emissor.
