class FakeChalk {
  #Reset = "\x1b[0m";
  #Underline = "\x1b[4m";
  #Dim = "\x1b[2m";
  #FgBlack = "\x1b[30m";
  #FgRed = "\x1b[31m";
  #FgGreen = "\x1b[32m";
  #FgYellow = "\x1b[33m";
  #FgBlue = "\x1b[34m";
  #FgMagenta = "\x1b[35m";
  #FgCyan = "\x1b[36m";
  #FgWhite = "\x1b[37m";

  green(text) {
    return `${ this.#FgGreen }${ text }${ this.#Reset }`;
  }

  red(text) {
    return `${ this.#FgRed }${ text }${ this.#Reset }`;
  }

  yellow(text) {
    return `${ this.#FgYellow }${ text }${ this.#Reset }`;
  }

  blue(text) {
    return `${ this.#FgBlue }${ text }${ this.#Reset }`;
  }

  magenta(text) {
    return `${ this.#FgMagenta }${ text }${ this.#Reset }`;
  }

  cyan(text) {
    return `${ this.#FgCyan }${ text }${ this.#Reset }`;
  }

  white(text) {
    return `${ this.#FgWhite }${ text }${ this.#Reset }`;
  }

  gray(text) {
    return `${ this.#Dim }${ text }${ this.#Reset }`;
  }

  underline(text) {
    return `${ this.#Underline }${ text }${ this.#Reset }`;
  }

  url(text) {
    return `${ this.#Underline }${ this.#Dim }${ text }${ this.#Reset }`;
  }

}

export default new FakeChalk();