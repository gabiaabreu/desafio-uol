export function getMaskedCPF(value: string) {
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, "$1.$2.$3-$4");
  return value;
}

export function getMaskedPhone(value: string) {
  value = value.replace(/\D/g, "");
  if (value.length > 11) {
    value = value.substring(0, 11);
  }
  value = value.replace(/(\d{2})(\d)/, "($1) $2");
  value = value.replace(/(\d)(\d{4})$/, "$1-$2");
  return value;
}
