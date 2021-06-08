var readlineSync = require('readline-sync');

/*Banco de palavras*/
var allWords = [
  'Abacaxi',
  'Manada',
  'mandar',
  'porta',
  'mesa',
  'Dado',
  'Mangas',
  'Já',
  'coisas',
  'radiografia',
  'matemática',
  'Drogas',
  'prédios',
  'implementação',
  'computador',
  'balão',
  'Xícara',
  'Tédio',
  'faixa',
  'Livro',
  'deixar',
  'superior',
  'Profissão',
  'Reunião',
  'Prédios',
  'Montanha',
  'Botânica',
  'Banheiro',
  'Caixas',
  'Xingamento',
  'Infestação',
  'Cupim',
  'Premiada',
  'empanada',
  'Ratos',
  'Ruído',
  'Antecedente',
  'Empresa',
  'Emissário',
  'Folga',
  'Fratura',
  'Goiaba',
  'Gratuito',
  'Hídrico',
  'Homem',
  'Jantar',
  'Jogos',
  'Montagem',
  'Manual',
  'Nuvem',
  'Neve',
  'Operação',
  'Ontem',
  'Pato',
  'Pé',
  'viagem',
  'Queijo',
  'Quarto',
  'Quintal',
  'Solto',
  'rota',
  'Selva',
  'Tatuagem',
  'Tigre',
  'Uva',
  'Último',
  'Vitupério',
  'Voltagem',
  'Zangado',
  'Zombaria',
  'Dor',
];

/*Regras de pontuação*/
var pontuationRules = [
  { points: 13, letters: 'QZ' },
  { points: 8, letters: 'JX' },
  { points: 5, letters: 'FHV' },
  { points: 3, letters: 'BCMP' },
  { points: 2, letters: 'DG' },
  { points: 1, letters: 'EAIONRTLSU' },
];

var possibleWorlds = allWords;
var matchedWords = [];
var typedLetters;

/*Correção para acentuações e resultado em caixa alta como
solicitado no desafio*/
function editString(str) {
  return str
    .toUpperCase()
    .normalize('NFD')
    .replace(/[^a-zA-Zs]/g, '');
}

/*Função principal*/
function main() {
  matchedWords = [];

  /*Rebecendo o input do usuário*/
  var letters = readlineSync.question('Digite as letras: ');

  typedLetters = letters;

  /*Otimizando o código*/
  possibleWorlds = allWords.filter(
    (word) => word.length <= typedLetters.length
  );

  for (const word of possibleWorlds) {
    testWord(editString(word), editString(typedLetters));
  }

  /*Sorteando, se houver palavras com a mesma quantidade de caracteres
  e o mesmo total de pontos*/
  matchedWords.sort((a, b) => {
    if (a.word.length === b.word.length && a.totalPoints === b.toUpperCase) {
      return 1;
    } else {
      return -1;
    }
  });

  /*Sorteando por total de pontos*/
  matchedWords.sort((a, b) => b.totalPoints - a.totalPoints);

  /*Resultado*/
  if (matchedWords.length === 0) {
    console.log('Nenhuma palavra foi encontrada!');
    console.log(`remainingLetters: ${typedLetters}`);
  } else {
    console.log(matchedWords);
  }

  main();
}

function testWord(word, input) {
  /*Inicializando contador*/
  let totalPoints = 0;

  normalizedWord = word.toUpperCase();
  const wordLetters = normalizedWord.split('');
  const matchedWord = wordLetters.every((letter) => {
    const hasLetter = input.includes(letter);
    if (hasLetter) {
      input = input.replace(letter, '');
      /*Contabilizando*/
      totalPoints += pontuationRules.find((obj) => obj.letters.includes(letter))
        .points;
    }
    return hasLetter;
  });

  if (matchedWord) {
    matchedWords.push({ word, totalPoints, remainingLetters: input });
  }
}

main();
