function keyboard(event) {   
    var press = event.key;
    if (press === "Enter") {
        if (document.activeElement.id === "Input") {
            Encode()
        }
    }
}
document.addEventListener("keydown", keyboard);

var chostype = document.getElementById('dropdown2');
//var cotype = document.getElementById('dropdown1');

function getType() {
    var e = document.getElementById("dropdown1");
    var codetype = e.options[e.selectedIndex].value;
    button = document.getElementById("button");
    wto = document.getElementById("l2");
    method = document.getElementById("l3");
    input = document.getElementById("Input").value
    if (wto.innerHTML.slice(10, wto.innerHTML.length-11)[(wto.innerHTML.slice(10, wto.innerHTML.length-11)).length-1])
    if (firstime) {
        wto.innerHTML = "What to en"+wto.innerHTML.slice(10, wto.innerHTML.length-11)+input.toLowerCase()+'</textarea>';
    }
    firstime = false;
    switch (this.value) {
        case 'encode':
            button.onclick = Encode;
            button.innerHTML = "Encode!";
            wto.innerHTML = "What to en"+wto.innerHTML.slice(10, wto.innerHTML.length-11-input.length)+input.toLowerCase()+'</textarea>';
            method.innerHTML = "En"+method.innerHTML.slice(2);
            break;
        case 'decode':
            button.onclick = Decode;
            button.innerHTML = "Decode!";
            wto.innerHTML = "What to de"+wto.innerHTML.slice(10, wto.innerHTML.length-11-input.length)+input.toLowerCase()+'</textarea>';
            method.innerHTML = "De"+method.innerHTML.slice(2);
            break;
    }
    document.getElementById('dropdown1').value=codetype;
    adSpecEnt()
}

function adSpecEnt() {
    var e = document.getElementById("dropdown1");
    var codetype = e.options[e.selectedIndex].value;
    var x = document.getElementById("Keyword");
    if (codetype === "Vinegar") {
        x.style.display = "block";
    } 
    else {
        x.style.display = "none";
    }
}

chostype.addEventListener('change', getType, false);
//cotype.addEventListener('change', adSpecEnt, false);

var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',',','.','1','2','3','4','5','6','7','8','9','0'];
var numberencoders = ['11','555','333','33','3','44','55','66','8','77','88','99','777','666','9','0','1','4','22','5','7','444','2','222','6','111','888','999','!','@','#','$','%','^','&','*','(',')'];
var vinword = ''
var firstime = true;
x = document.getElementById("Keyword");
x.style.display = "none";

function Encode() {
    var e = document.getElementById("dropdown1");
    var codetype = e.options[e.selectedIndex].value;
    if (codetype === 'Number') {
        encodeNumber();
    }
    else if (codetype === "Vinegar") {
        vinword = document.getElementById("InputKeyword").value.toLowerCase();
        if (!(/^[a-zA-Z]+$/.test(vinword))) {
            alert("Error: keyword must have only letters.");
            return null;
        }
        encodeVinegar(vinword);
    }
}

function Decode() {
    var e = document.getElementById("dropdown1");
    var codetype = e.options[e.selectedIndex].value;
    if (codetype === 'Number') {
        decodeNumber();
    }
    else if (codetype === "Vinegar") {
        vinword = document.getElementById("InputKeyword").value;
        decodeVinegar(vinword);
    }
}

function encodeNumber() {
    output = '';
    toen = document.getElementById("Input").value.toLowerCase();
    if (!(/^[a-zA-Z]+$/.test(toen.replace(/ |,|\.|[0-9]/g, "")))) {
        alert("Error: input must have only letters, numbers, spaces, commas and periods.");
        return null;
    }
    for (char in toen) {
        char = toen[char];
        if (char === ' ') {
            output = output+'-';
            continue;
        }
        numval = numberencoders[alphabet.indexOf(char.toLowerCase())];
        if (output.length > 0 && numval.includes(output[output.length-1])) {
            output = output+' ';
        }
        output = output+numval;
    }
    document.getElementById("Output").value = output;
}

function encodeVinegar(keyword) {
    function numberToLetter(n) {
        n = n % 26;
        if (n-1 === -1) {
            return alphabet[25];
        }
        return alphabet[n-1];
    }

    function fillTabulaRecta() {
        TabulaRecta = [];
        for (r = 0; r < 26; r++) {
            TabulaRecta.push([]);
            for (c = 1; c < 27; c++) {
                TabulaRecta[TabulaRecta.length-1].push(numberToLetter(c+r));
            }
        }
        return TabulaRecta;
    }

    function getTabulaRectaLetter(l1, l2, TabulaRecta) {
        return TabulaRecta[alphabet.indexOf(l1)][alphabet.indexOf(l2)];
    }

    function getKeywordForm(keyword, toen) {
        kform = ''
        offset = 0
        for (char = 0; char < toen.length; char++) {
            if (toen[char] === ' ') {
                kform = kform + ' ';
                offset = offset + 1;
                if (offset > keyword.length-1) {
                    offset = 0;
                }
                continue;
            }
            if (char % keyword.length-offset < 0) {
                kform = kform+keyword[keyword.length+(char % keyword.length-offset)];
            }
            kform = kform+keyword[char % keyword.length-offset];
        }
        kform = kform.replace(/undefined/g, '')
        return kform;
    }
    output = '';
    toen = document.getElementById("Input").value.toLowerCase();
    if (!(/^[a-zA-Z]+$/.test(toen.replace(/ /g, "")))) {
        alert("Error: input must have only letters and spaces.");
        return null;
    }
    kform = getKeywordForm(keyword, toen);
    TabulaRecta = fillTabulaRecta();
    for (char = 0; char < toen.length; char++) {
        if (toen[char] === ' ') {
            output = output + ' ';
            continue;
        }
        output = output + getTabulaRectaLetter(toen[char], kform[char], TabulaRecta);
    }
    document.getElementById("Output").value = output;
}

function decodeNumber() {
    output = '';
    skipnext = 0;
    tode = document.getElementById("Input").value.toLowerCase();
    if (!(/^\d+$/.test(tode.replace(/ |-|!|@|#|\$|%|^|&|\*|\(|\)/g, "")))) {
        alert("Error: input must have only numbers, spaces, dashes and the Shift+number symbols.");
        return null;
    }
    for (char in tode) {
        ori = parseInt(char);
        char = tode[char];
        if (skipnext > 0) {
            skipnext = skipnext - 1;
            continue;
        }
        if (char === ' ') {
            continue;
        }
        if (char === '-') {
            output = output+' ';
            continue;
        }
        if (ori+2 < tode.length && tode[ori+2] === char && tode[ori+1] === char) {

            char = char+char+char;
            skipnext = 2;
        }
        else if (ori+1 < tode.length && tode[ori+1] === char) {
            char = char+char;
            skipnext = 1;
        }
        lval = alphabet[numberencoders.indexOf(char.toLowerCase())];
        output = output+lval;
    }
    document.getElementById("Output").value = output;
}

function decodeVinegar(keyword) {
    function numberToLetter(n) {
        n = n % 26;
        if (n-1 === -1) {
            return alphabet[25];
        }
        return alphabet[n-1];
    }
    function fillTabulaRecta() {
        TabulaRecta = [];
        for (r = 0; r < 26; r++) {
            TabulaRecta.push([]);
            for (c = 1; c < 27; c++) {
                TabulaRecta[TabulaRecta.length-1].push(numberToLetter(c+r));
            }
        }
        console.log(TabulaRecta)
        return TabulaRecta;
    }

    function getKeywordForm(keyword, toen) {
        kform = ''
        offset = 0
        for (char = 0; char < toen.length; char++) {
            if (toen[char] === ' ') {
                kform = kform + ' ';
                offset = offset + 1;
                if (offset > keyword.length-1) {
                    offset = 0;
                }
                continue;
            }
            if (char % keyword.length-offset < 0) {
                kform = kform+keyword[keyword.length+(char % keyword.length-offset)];
            }
            kform = kform+keyword[char % keyword.length-offset];
        }
        kform = kform.replace(/undefined/g, '')
        return kform;
    }
    output = ''
    tode = document.getElementById("Input").value.toLowerCase();
    if (!(/^[a-zA-Z]+$/.test(tode.replace(/ /g, "")))) {
        alert("Error: input must have only letters and spaces.");
        return null;
    }
    kform = getKeywordForm(keyword, tode);
    TabulaRecta = fillTabulaRecta();
    for (char = 0; char < tode.length; char++) {
        if (tode[char] === ' ') {
            output = output + ' ';
            continue;
        }
        for (r in TabulaRecta) {
            r = TabulaRecta[r];
            if (r.indexOf(tode[char]) == alphabet.indexOf(kform[char])) {
                output = output + r[0];
            }
        }
    }
    document.getElementById("Output").value = output;
}
