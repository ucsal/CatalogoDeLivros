# Catálogo De Livros

* Projeto AVI2 - Programação Para Dispositivos Móveis 
* Professor Responsavel: Mario Jorge
  

> Este é um projeto meramente academico, para a máteria de Prog. para Dispositivos Móveis da Universidade Católica do Salvador!

> Nesse Readme daremos um maior foco na parte Frontend deste projeto, deixando a parte do backend para menções mais frugais.

> Os código fornecidos são apenas pequenas partes retiradas do projeto para melhor ilustração de seu funcionamento por meio desta documentação. Para um entendimento completo do funcionamento, por favor, ler o código fonte. 

# Sobre este projeto:

O projeto Catálogo de Livros consiste em uma aplicação mobile construida com react native e nestJs. A aplicação tem como objetivo oferecer um ambiente onde usuários possam vizualizar uma diversa seleção de livros, desde fantasias até estudos científicos e muito mais, além de marcar esses livros como favoritos e adicionarem anotações que achem úteis. O aplicativo abre uma porta para uma busca simples e eficientes de quaisquer livros que o usuário tenha em mente e que deseje obter mais informações sobre, ou simplesmente marca-lo como uma futura leitura.

# Tecnologias
## Linguagens
<div style="display: inline_block">
 <img align="center" alt="Js" height="20" width="30" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg">
 <img align="center" alt="TypeScript" height="20" width="30" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" />
<div/>
 
## Frotend Framework
 * <img align="center" alt="Reactjs" height="20" width="30" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" /> Um framework para desenvolvimento de aplicações mobile nativas para iOS e Android, utilizando JavaScript e React. Seus principais recursos permitem a criação eficiente de interfaces de usuário dinâmicas, compartilhando código entre plataformas.
## Backend Framework
 * <img align="center" alt="NestJs" height="20" width="30" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg" /> NestJS é um framework para a construção de aplicativos Node.js do lado do servidor eficientes e escalonáveis. Ele usa JavaScript progressivo, é construído e oferece suporte total a TypeScript e combina elementos de OOP (Programação Orientada a Objetos), FP (Programação Funcional) e FRP (Programação Funcional Reativa).
## API
 * API pessoal - Para este projeto, foi criado uma API em nestJs responsavel pela autenticação do usuário e manuseio da api externa do Google Books assim como funcionalidades tais qual são todas listadas abaixo:
   * Autenticação do usuário atravês da biblioteca jwt.
   * Comunicação com a api do Google Books para busca e manusei de livros e seus dados.
   * Ação de adicionar um livro como favorito
   * Ação de adicionar anotações para livros
  
* API Google Books - Api do Google Books que lida com toda a busca dos dados dos livros.

# Interface do Usuário
> Aqui serão explicados como as telas do aplicativo operam, fornecendo imagens para melhor entendimento.

## Login e Cadastro
 * O login funciona de forma simples e direta, gerando um token de autenticação jwt que servirá de autenticação para as próximas ações do usuário pelo aplicativo
 * O Cadastro segue a mesma linha, creando o registro no banco de dados e o redirecionando para o login, para que seu token possa ser gerado pela API.
   
   #### Telas
   ![indexDesktop](https://github.com/DiegoAndradeD/CatalogoDeLivros/blob/main/catalogo-de-livros/catalogoImagens/telaDeLogin.PNG)
   ![indexDesktop](https://github.com/DiegoAndradeD/CatalogoDeLivros/blob/main/catalogo-de-livros/catalogoImagens/telaDeCadastro.PNG)
   
   ### Código de exemplo
   
  <details>
          <summary>Mostrar Código</summary>

            // Função de Login
            const onSignInPressed = async () => {
            try {
              const userId = await getUserByUsernameAndPassword(username, password);
              const response = await axios.post(`${API_HOST_ADDRESS}/auth/signIn`, {
                username,
                password,
              });
        
              if (response.status === 200) {
                const token = response.data.token;
                await AsyncStorage.setItem("token", JSON.stringify(token.token));
                await AsyncStorage.setItem("userId", userId.toString());
              }
              navigation.navigate("HomePage");
            } catch (error) {
              console.error("Erro de login: ", error);
            }
          };

      // Componente de Cadastro
      <ScrollView>
        <View style={styles.root}>
          <Text style={styles.title}>Create an account</Text>
          <CustomInput
            placeholder="Username"
            value={username}
            setValue={setUsername}
            secureTextEntry={false}
          />

        <CustomInput
          placeholder="Email"
          value={email}
          setValue={setEmail}
          secureTextEntry={false}
        />

        <CustomInput
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />

        <CustomInput
          placeholder="Repeat Password"
          value={passwordRepeat}
          setValue={setPasswordRepeat}
          secureTextEntry={true}
        />

        <CustomButton
          onPress={onRegisterPressed}
          text="Register"
          type="PRIMARY"
        />

        <Text style={styles.text}>
          By registering, you confirm that you accept our{" "}
          <Text style={styles.link} onPress={onTermsOfUserPressed}>
            Terms of Use
          </Text>{" "}
          and{" "}
          <Text style={styles.link} onPress={onPrivacyPolicyPressed}>
            Privacy Policy
          </Text>
        </Text>
        <CustomButton
          onPress={onSignInPressed}
          text="Have an account? Sign In"
          type="TERTIARY"
        />
      </View>
    </ScrollView>
     
   </details>

   ## Página Inicial e Busca
   * A página inicial é responsavel por mostrar livros gerais, normalmente relacionandos a algum assunto específico, que é aleatoriamente escolhido pela API. Ela também é uma possível rota para a página de um livro específico, ao clicar na imagem do livro.
   * A busca é a função que popula a página inicial com livros referentes a busca do usuário, seja ela por categorias, nomes dos livros ou até mesmo seus autores.
   
   #### Telas
   ![indexDesktop](https://github.com/DiegoAndradeD/CatalogoDeLivros/blob/main/catalogo-de-livros/catalogoImagens/telaInicial.PNG)
   ![indexDesktop](https://github.com/DiegoAndradeD/CatalogoDeLivros/blob/main/catalogo-de-livros/catalogoImagens/telaInicialComBusca.PNG)
   
   ### Código de exemplo
   
  <details>
          <summary>Mostrar Código</summary>

            // Função para puxar os livros da API
            const useGetBooksList = () => {
            const [data, setData] = useState([]);
          
            const fetchBooksList = async () => {
              try {
                const token = await AsyncStorage.getItem("token");
                const response = await axios.get(`${API_HOST_ADDRESS}/books/loadBooks`, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
                setData(response.data);
              } catch (error) {
                console.error(error);
              }
            };

           useFocusEffect(
             React.useCallback(() => {
               fetchBooksList();
             }, [])
           );
           return { data, fetchBooksList };
         };
         
         export default useGetBooksList;


      // Componente da página inicial
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header_container}>
          <Text style={styles.header_text1}>Welcome!</Text>
          <Text style={styles.header_text2}>
            What do you want to read today?
          </Text>
        </View>
        <View style={styles.searchBarContainer}>
          <TextInput
            placeholder="Search"
            clearButtonMode="always"
            style={styles.searchBar}
            autoCapitalize="none"
            autoCorrect={false}
            value={searchQuery}
            onChangeText={(query) => setSearchQuery(query)}
          />
          <TouchableOpacity onPress={handleSearch}>
            <Icon
              name="search"
              size={25}
              color="#fff"
              style={styles.searchIcon}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={searchedBooks.length > 0 ? searchedBooks : books.data}
          renderItem={({ item }) => (
            <BookItem key={item.id.toString()} item={item} isShowing={false} />
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.flatList}
        />
      </SafeAreaView>
      <CustomNavbar />
     
   </details>
   
## Configurações
   * Esta é uma simples pagina que possui somente a função de desconectar para o usuário.
   
   #### Telas
   ![indexDesktop](https://github.com/DiegoAndradeD/CatalogoDeLivros/blob/main/catalogo-de-livros/catalogoImagens/telaDeSettings.PNG))
   
   ### Código de exemplo
   
  <details>
          <summary>Mostrar Código</summary>

            export default function Settings() {
             const navigation = useNavigation();
           
             const handleLogout = async () => {
               try {
                 await AsyncStorage.removeItem("token");
               } catch (error) {
                 console.error("Erro ao fazer logout:", error);
               }
               navigation.navigate("SignIn");
             };
           
             return (
               <>
                 <SafeAreaView style={styles.safeArea}>
                   <View>
                     <Text style={styles.settings_text}>Settings</Text>
                     <CustomButton onPress={handleLogout} text="Logout" type="PRIMARY" />
                   </View>
                 </SafeAreaView>
                 <CustomNavbar />
               </>
             );
           }
     
   </details>

   ## Favoritos
   * Esta página exibi os livros marcados como favorito pelo usuário assim como oferece a opção de ir para a página de qualquer livro lá presente ao clicar em sua capa.
   
   #### Telas
   ![indexDesktop](https://github.com/DiegoAndradeD/CatalogoDeLivros/blob/main/catalogo-de-livros/catalogoImagens/telaDeFavoritos.PNG)
   
   ### Código de exemplo
   
  <details>
          <summary>Mostrar Código</summary>

            export default function FavoriteBooksPage() {
             const favoriteBooks = useGetUserFavorites();
             return (
               <>
                 <SafeAreaView style={styles.safeArea}>
                   <View style={styles.favortes_header}>
                     <Text style={styles.favorites_text}>Favoritos</Text>
                   </View>
                   <FlatList
                     data={favoriteBooks}
                     renderItem={({ item }) => <BookItem item={item} isShowing={true} />}
                     keyExtractor={(item) => item.id.toString()}
                     numColumns={2}
                     contentContainerStyle={styles.flatList}
                   />
                 </SafeAreaView>
                 <CustomNavbar />
               </>
             );
           }
  
     
   </details>

   ## Livro
   * Esta página exibi as informações de um livro, assim como possibilita sua adição como favorito e a ação de adicionar anotações ao mesmo.
   
   #### Telas
   ![indexDesktop](https://github.com/DiegoAndradeD/CatalogoDeLivros/blob/main/catalogo-de-livros/catalogoImagens/telaDeLivroNaoFavorito.PNG)
   ![indexDesktop](https://github.com/DiegoAndradeD/CatalogoDeLivros/blob/main/catalogo-de-livros/catalogoImagens/telaDeLivroFavoritoComNotas.PNG)
    
   ### Código de exemplo
   
  <details>
          <summary>Mostrar Código</summary>

            const useGetBooksList = (bookId) => {
            const [bookData, setBookData] = useState();
          
            useFocusEffect(
              React.useCallback(() => {
                const fetchData = async () => {
                  try {
                    const token = await AsyncStorage.getItem("token");
                    const userId = await AsyncStorage.getItem("userId");
                    const userFavorites = await getUserFavorites(userId);
                    const favoritesToSend = userFavorites.map(
                      (favorite) => favorite.bookid
                    );
                    const annotationsForBook = userFavorites
                      .filter((favorite) => favorite.bookid === bookId)
                      .map((favorite) => favorite.annotations);
                    console.log(annotationsForBook);
                    const response = await axios.post(
                      `${API_HOST_ADDRESS}/books/book/${bookId}`,
                      {
                        favorites: favoritesToSend,
                        annotations: annotationsForBook,
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    );
                    if (response.data != undefined) {
                      setBookData(response.data);
                    }
                  } catch (error) {
                    console.log(error);
                  }
                };
          
                fetchData();
              }, [bookId])
            );
          
            return bookData;
          };
          
          export default useGetBooksList;
  
     
   </details>

   # Detalhes Avançados
   > Nessa sessão, será explicado de maneira mais aprofundada o funcionamento da aplicação, exemplos de onde as funcionalidades descritas são empregadas também estão presentes.

   > A maioria das funções usa o token do usuário como medida de autenticação para sua comunicação com o backend, tal token é guardado na memória local do aparelho do usuário por meio da biblioteca {AsyncStorage}

  ## App
  * No arquvio **App** é definido a logica para a execução do banco de dados, que de ser executado uma vez a cada abertura do aplicativo, é definido um estado para lidar com qualquer carregamento necessário e por fim chama o componente **MainContainer** 
  
  ## Navegação
  * O react native provê diversas bibliotecas para os mais diversos usos, algumas delas como a {createStackNavigator} são usadas neste projeto, mais especificamente no arquivo **MainContainer** para lidarem com o roteamento das telas.

  ## Banco de dados
  * O banco de dados (SQLlite) para persistencia local da aplicação é provido pela biblioteca {expo-sqlite} da expo (Plataforma de estruturação usada para criar esse projeto react native)
  * No arquivo **database** temos toda a logica para a geração do banco de dados, assim como funções para inserções, seleções e updates, todas seguindo um padrão de estrutura e usando sql comum para suas querys.

 ## Usuário
 * O arquvio **SignupPage** consiste no componente de cadastro e sua logica, que, seguindo um processo simples, somente cadastra o usuário no banco de dados.
 * O arquvio **SignInPage** é constituido de sua logica para formação da interface do compenente e logica de login. Para o login, o usuário é verificado no banco de dados, e, após isso, um token é gerado para o mesmo pela api, token esse que será sua autenticação para o aplicativo. Após o fim do processo, o usuário é redirecionando para a página inicial.

## Página Inicial
* O arquvio **searchBooks** é responsavel buscar os dados da API para qualquer termo procurado pelo usuário na aba de busca.
* O arquivo **useGetBooksList** é responsavel por pegar os livros gerais que aparecem como padrão na página inicial.
* O arquivo **HomePage** é o componente principal, que invoca as funções citadas acima e também passa os dados obtidos por elas para outros componentes gerais que veremos mais a frente.

## Configurações
* O arquivo **Settings** simplesmente é responsavel pelo logout do usuário, destruindo seu token guardado localmente.

## Favoritos
* O arquivo **useGetUserFavorites** é responsavel por recuperar os dados dos livros favoritos do usuário, para isso ele utiliza os id's dos livros guardados no banco de dados local e as utiliza para pegar os dados dos livros atravês da API.
* O arquivo **FavoriteBooksPage** é o componente principal, que passa os dados obtidos para o componente geral **BookItem**
