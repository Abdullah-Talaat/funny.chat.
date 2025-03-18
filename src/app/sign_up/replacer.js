export function encode(text) {
  if (text === null || text === undefined) return "";
  text = text.toString()
    let ttt = text 
      .replace(/0/g, "ZTW")
      .replace(/1/g, "OCi")
      .replace(/2/g, "TVX")
      .replace(/3/g, "DFR")
      .replace(/4/g, "GyUi")
      .replace(/5/g, "TOPL")
      .replace(/6/g, "XTUY")
      .replace(/7/g, "VICT")
      .replace(/8/g, "EAITY")
      .replace(/9/g, "NIVB")
      .replace(/-/g, "FPY")
      .replace(/UT/g , "ATYUW")
      ;
      //(ttt)
      return ttt
  }
  
  export function decode(text) {
    if (text === null || text === undefined) return "";
    text = text.toString()
    let ttt = text
    .replace(/OCi/g, "1")
      .replace(/ZTW/g, "0")
      .replace(/TVX/g, "2")
      .replace(/DFR/g, "3")
      .replace(/GyUi/g, "4")
      .replace(/VICT/g, "7")
      .replace(/XTUY/g, "6")
      .replace(/TOPL/g, "5")
      .replace(/NIVB/g, "9")
      .replace(/ATYUW/g , "UT")
      .replace(/EAITY/g, "8")
      .replace(/FPY/g, "-")
      ;
      //(ttt)
      return ttt
  }