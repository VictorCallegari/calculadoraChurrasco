function irPagCriar() {
  window.location.href = "/criar_churrasco.html"
}

function irPagEditar(id) {
  window.location.href = `/editar_churrasco.html?id=${id}`;
}



async function getLastId() {
  const response = await fetch('http://localhost:3000/churrascos')
  const data = await response.json();
  return data.length <= 0 ? 0 : data[data.length - 1].id;
}

async function criarChurrasco(event) {
  event.preventDefault();

  let data = document.getElementById('data')
  let homens = document.getElementById('homens')
  let mulheres = document.getElementById('mulheres')
  let criancas = document.getElementById('criancas')

  let homensValor = Number(homens.value)
  let mulheresValor = Number(mulheres.value)
  let criancasValor = Number(criancas.value)

  let dataConvertida = new Date(data.value);
  dataConvertida = dataConvertida.toLocaleDateString("pt-BR", { timeZone: 'UTC', });

  if (homensValor == 0 || mulheresValor == 0 || criancasValor == 0 || data.value == '') {
    alert("Preencha todos os campos!");
    return;
  }

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
    id: `${++lastId}`,
    quantidadeHomens: homens.value,
    quantidadeMulheres: mulheres.value,
    quantidadeCriancas: criancas.value,
    quantidadePessoas: soma,
    quantidadePaoAlho: somaPaoDeAlho,
    quantidadeCarne: somaKgCarne,
    quantidadeRefri: garrafas,
    quantidadeCerveja: cerveja,
    quantidadeCarvao: carvao,
    dataChurrasco: dataConvertida
  }
  const response = await fetch('http://localhost:3000/churrascos', {
    method: 'POST',
    body: JSON.stringify(elementos),
  })

  window.location.href = "/index.html";

}
