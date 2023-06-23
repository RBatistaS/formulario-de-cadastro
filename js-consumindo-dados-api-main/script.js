//esse e um modo de buscar api, existe outros metodos que iremos explorar

//var consultaCEP = fetch('https://viacep.com.br/ws/01001000/json/')
//then  e u método de quandoa promessa e resolvida
//.then(resposta => resposta.json())
//.then(r => {
 //   if (r.erro) {
 //       throw Error('Esse cep não existe!')
//    } else
//    console.log(r)})
//    //catch e quando a promessa é rejeitada
//.catch(erro => console.log(erro))
//finally e pra carregar uma msg padrão fixa na tela indempendente da resposta.
//.finally(mensagem => console.log('Processamento consluído!'));

//outro modo de consumir a API bem mais fácil
async function buscarEndereco(cep){
    //foi usado o try e o catch para fazer a parte lógica do erro
    var mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = "";
    try {
    var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    //convertendo retorno do fetch em json
    var consultaCEPConvertida = await consultaCEP.json();
    if (consultaCEPConvertida.erro) {
        throw Error('CEP não existente!');
    }

    //recebendo dados no html
    var cidade = document.getElementById('cidade');
    var logradouro = document.getElementById('endereco');
    var estado = document.getElementById('estado');
    var estado = document.getElementById('bairro');

    cidade.value = consultaCEPConvertida.localidade;
    logradouro.value = consultaCEPConvertida.logradouro;
    estado.value = consultaCEPConvertida.uf;
    bairro.value = consultaCEPConvertida.bairro;

    console.log(consultaCEPConvertida);
    return consultaCEPConvertida;
    } catch (erro) {
    mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`
    console.log(erro);
    }
}
//aqui embaixo usamos esse trecho para mostrar no console as promessas. 
// let ceps = ['01001000','01001001'];
// let conjuntoCeps = ceps.map(valores => buscarEndereco(valores));
// console.log(conjuntoCeps);
// Promise.all(conjuntoCeps).then(respostas=> console.log(respostas));

//auto complete
var cep = document.getElementById('cep');
cep.addEventListener("focusout", () => buscarEndereco(cep.value));

