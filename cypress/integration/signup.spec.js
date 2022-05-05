import SignupPage from "../pages/SignupPage";

describe("Signup", () => {
  beforeEach(function () {
    cy.fixture("deliver").then((result) => {
      this.deliver = result;
    });
  });

  const signup = new SignupPage();

  it("User should be deliver", function () {
    signup.go();
    signup.fillForm(this.deliver.signup);
    signup.submit();
    const expectedMessage =
      "Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.";
    signup.modalContentShouldBe(expectedMessage);
  });

  it("Incorrect document", function () {
    signup.go();
    signup.fillForm(this.deliver.cpf_inv);
    signup.submit();
    signup.alertMessageShouldBe("Oops! CPF inválido");
  });

  it("Incorrect email", function () {
    signup.go();
    signup.fillForm(this.deliver.email_inv);
    signup.submit();
    signup.alertMessageShouldBe("Oops! Email com formato inválido.");
  });

  context("Required fields", function () {
    const messages = [
      { field: "name", output: "É necessário informar o nome" },
      { field: "cpf", output: "É necessário informar o CPF" },
      { field: "email", output: "É necessário informar o email" },
      { field: "postalcode", output: "É necessário informar o CEP" },
      { field: "number", output: "É necessário informar o número do endereço" },
      { field: "delivery_method", output: "Selecione o método de entrega" },
      { field: "cnh", output: "Adicione uma foto da sua CNH" },
    ];

    before(function () {
      signup.go();
      signup.submit();
    });

    messages.forEach(function (msg) {
      it(`${msg.field} is required`, function () {
        signup.alertMessageShouldBe(msg.output);
      });
    });
  });
});
