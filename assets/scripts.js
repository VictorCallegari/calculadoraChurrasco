function irPagCriar() {
  window.location.href = "/criar_churrasco.html"
}


async function getLastId() {
  const response = await fetch('http://localhost:3000/churrascos');
  const data = await response.json();
  return data[data.length - 1].id;
}

async function criarChurrasco() {
  let data = document.getElementById('data')
  let homens = document.getElementById('homens')
  let mulheres = document.getElementById('mulheres')
  let criancas = document.getElementById('criancas')

  let homensValor = Number(homens.value)
  let mulheresValor = Number(mulheres.value)
  let criancasValor = Number(criancas.value)

  const soma = homensValor + mulheresValor + criancasValor;

  /*Calculo*/

  const kgHomem = homensValor * 0.4;
  const kgMulher = mulheresValor * 0.32;
  const kgCrianca = criancasValor * 0.20;

  const somaKgCarne = kgHomem + kgMulher + kgCrianca;

  /*pao de alho*/

  const paoAdulto = (homensValor + mulheresValor) * 2;
  const paoCrianca = criancasValor * 1;

  const somaPaoDeAlho = paoAdulto + paoCrianca;

  /*Carvão*/

  const carvao = (soma * 1)

  /*Refrigerante*/

  let garrafas = Math.ceil(soma / 5);

  /*Cerveja*/

  const cerveja = (homensValor + mulheresValor) * 3;


  let lastId = await getLastId();


  const elementos = {
    id: ++lastId,
    quantidadeHomens: homens.value,
    quantidadeMulheres: mulheres.value,
    quantidadeCriancas: criancas.value,
    quantidadePessoas: soma,
    quantidadePaoAlho: somaPaoDeAlho,
    quantidadeCarne: somaKgCarne,
    quantidadeRefri: garrafas,
    quantidadeCerveja: cerveja,
    quantidadeCarvao: carvao,
    dataChurrasco: data.value
  }
  const response = await fetch('http://localhost:3000/churrascos', {
    method: 'POST',
    body: JSON.stringify(elementos),
  })

}
