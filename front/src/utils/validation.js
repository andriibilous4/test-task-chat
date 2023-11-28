export function validateName(name) {
  return name.length > 0;
}

export function validateMessage(message) {
  return message.trim() !== '' && message.length < 255;
} 