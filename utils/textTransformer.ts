function textTransformer(text: string) {
  return text.replaceAll(' ', '-').toLowerCase();
}

export default textTransformer;
