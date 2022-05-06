const onRun = () => {
  let code = document.getElementById('txtArea').value;

  if (!code) {
    document.getElementById('result').value = '';
    return;
  }

  const line = code.split('\n');

  let fun = '';

  for (let index = 0; index < line.length; index++) {
    const element = line[index].trim().split(' ');

    if (element.length === 1) continue;

    if (index < line.length - 1) {
      if (line[index + 1].indexOf(element[0]) >= 0) {
        let result = handleCases(line, index);
        index = result[0];
        fun += result[1];

        document.getElementById('result').value = fun;
        continue;
      } else if (line[index + 1].indexOf('|') >= 0) {
        let result = handleConditional(line, index);

        index = result[0];
        fun += result[1];

        document.getElementById('result').value = fun;
        continue;
      }
    }

    let name = '';
    let varibles = [];
    let str = '';

    for (let i = 0; i < element.length; i++) {
      if (element[i] === '=') {
        str = concatenateText(element, i + 1);
        str.trim();
        break;
      }

      if (i === 0) {
        name = element[i];
      } else {
        varibles.push(element[i]);
      }
    }

    if (varibles.length === 0) {
      fun += `function ${name}() {
    return ${str}
}

`;
    } else {
      fun += `function ${name}(${varibles.map(e => e)}) {
    return ${str}
}

`;
    }

    fun.trim();

    document.getElementById('result').value = fun;
  }
};

const handleConditional = (array, i) => {
  let name = '';
  let variables = [];
  let str = '';
  let sino = false;
  let where = false;

  let resultados = [];

  for (let index = i; index < array.length; index++) {
    const element = array[index].trim().split(' ');
    let conditional = [];

    if (element.length === 1) {
      resultados.push(index);
      resultados.push(str);
      break;
    }

    if (index === i) {
      name = element[0];

      element.filter((e, i) => i !== 0).map(e => variables.push(e));

      str = `function ${name} (${variables.map(e => e)}) {
  `;
    } else {
      let txt = '';
      for (let j = 1; j < element.length; j++) {
        if (element[j] === '=') {
          txt = concatenateText(element, j + 1);

          if (conditional[0] === 'otherwise') {
            str += `else {
       return ${txt}
  }
}

`;

            if (array.length - 1 >= index + 1) {
              continue;
            } else {
              resultados.push(index);
              resultados.push(str);
              break;
            }
          } else {
            let v = '';
            conditional.map(e => (v += `${e} `));

            v.trim();

            if (!sino) {
              str += `if( ${v}) {
    return ${txt}
  } `;
              sino = true;
            } else {
              str += `else if( ${v}) {
    return ${txt}
  } `;
            }
            continue;
          }
        }

        // End '='

        if (element[j] === '**') {
          conditional.pop();
          let exp = `Math.pow(${element[j - 1]}, ${element[j + 1]})`;
          j++;
          conditional.push(exp);
          continue;
        }

        if (element[j - 1] === 'where') {
          where = true;

          let elements = [];
          elements.push('let ');
          for (let k = j; k < element.length; k++) {
            if (element[k] === '**') {
              elements.pop();
              let exp = `Math.pow(${element[k - 1]}, ${element[k + 1]})`;
              k++;
              elements.push(exp);
              continue;
            }

            elements.push(element[k]);
          }

          let result = '';

          elements.map(e => (result += e));
          let sep = str.split('\n')
          sep.splice(1,0,"  "+result);
          str = ""
          sep.map(e => str+=e+"\n")

          if (array.length - 1 >= index + 1) {
            break;
          } else {
            resultados.push(index);
            resultados.push(str);
            break;
          }
        }

        conditional.push(element[j]);
      }
    }
  }

  return resultados;
};

const concatenateText = (array, position) => {
  let text = '';

  for (let index = position; index < array.length; index++) {
    text += array[index] + ' ';
  }

  text.trim();

  return text;
};

const onClean = () => {
  document.getElementById('result').value = '';
  document.getElementById('txtArea').value = '';
};

const handleCases = (array, i) => {
  let name = '';
  let str = '';
  let def = false;

  let resultados = [];

  for (let index = i; index < array.length; index++) {
    const element = array[index].trim().split(' ');

    if (element.length === 1) {
      resultados.push(index);
      resultados.push(str);
      break;
    }

    if (index === i) {
      name = element[0];
      str = `case ${element[1]}:
    return ${element[3]}
  `;
    } else {
      for (let j = 1; j < element.length; j++) {
        if (element[j] === '=') {
          let cadena = '';
          if (def) {
            for (let k = j + 1; k < element.length; k++) {
              if (element[k] === '++') {
                cadena += '+';
              } else if (element[k].includes(']')) {
                let s = element[k].substring(1, element[k].length - 1);
                cadena += s;
              } else cadena += element[k];
            }
            str += `return ${cadena}
 }
}

`;
            break;
          } else {
            str += `return ${element[j + 1]}
  `;
            break;
          }
        } else {
          if (element[j].indexOf("'") >= 0) {
            str += `case ${element[j]}:
    `;
          } else {
            str = `function ${name} (${element[j]}) {
 switch(${element[j]}) {
  ${str}default:
    `;
            def = true;
          }
        }
      }
    }
  }

  return resultados;
};
