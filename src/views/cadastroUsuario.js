import React from "react";
import Card from '../components/card'
import FormGroup from "../components/form-group";
import { withRouter } from 'react-router-dom'
import UsuarioService from "../app/service/usuarioService"
import {mensagemErro, mensagemSucesso} from '../components/toastr'

class CadastroUsuario extends React.Component{
    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    constructor(){
        super();
        this.service = new UsuarioService();
    }

    validar(){
        const msgs = [];

        if(!this.state.nome){
            msgs.push('O campo Nome é obrigatório.');
        }
        if(!this.state.email){
            msgs.push('O campo Email é obrigatório.');
        }else if(!this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
            msgs.push('Informe um Email Válido.');
        }

        if(!this.state.senha || !this.state.senhaRepeticao){
            msgs.push('Digite a senha 2x.');
        }else if(this.state.senha !== this.state.senhaRepeticao){
            msgs.push('As senhas não coincidem');
        }

        return msgs;
    }


    cadastrar = () => {
        const msgs = this.validar();

        if(msgs && msgs.length > 0){
            mensagemErro(msgs[0]);
            return false;
        }
        this.service.salvar({
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha
        }).then(response => {
            mensagemSucesso('Usuário cadastrado com sucesso! Faça o login para acessar o sistema.');
            this.props.history.push('/login');
        }).catch(error => {
            mensagemErro(error.response.data);
        })       
    }
    
    cancelar = () => {
        this.props.history.push('/home');
    }

    render(){
        return(

            <div className="row">             
                <div className="col-md-6" style={ {position : 'relative', left: '300px'} }>
                    <div className="bs-docs-section">
            
                        <Card title="Cadastro de Usuário">
                            <div className="row">
                                 <div className="col-lg-12">
                                    <div className="bs-component">
                                        <FormGroup label="Nome: *" htmlFor="inputNome">
                                            <input type="text"
                                            id="inputNome"
                                            className="form-control"
                                            name="nome"
                                            onChange={e => this.setState({nome: e.target.value})}/> 
                                        </FormGroup>   
                                         <FormGroup label="Email: *" htmlFor="inputEmail">
                                            <input type="email"
                                            id="inputEmail"
                                            className="form-control"
                                            name="email"
                                            onChange={e => this.setState({email: e.target.value})}/> 
                                        </FormGroup>
                                        <FormGroup label="Senha: *" htmlFor="inputSenha">
                                            <input type="password"
                                            id="inputSenha"
                                            className="form-control"
                                            name="senha"
                                            onChange={e => this.setState({senha: e.target.value})}/>
                                        </FormGroup>
                                        <FormGroup label="Repita a Senha: *" htmlFor="inputRepitaSenha">
                                            <input type="password"
                                            id="inputRepitaSenha"
                                            className="form-control"
                                            name="senha"
                                            onChange={e => this.setState({senhaRepeticao: e.target.value})}/>
                                        </FormGroup>
                                            <button onClick={this.cadastrar} type="button" className="btn btn-success"><i className="pi pi-save"></i> Salvar</button>
                                            <button onClick={this.cancelar} type="button" className="btn btn-danger"><i className="pi pi-times"></i> Cancelar</button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter( CadastroUsuario )