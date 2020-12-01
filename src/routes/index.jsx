import React from "react";
import { Switch } from "react-router-dom";

import Route from "./Route";

import Atendimento from "../pages/atendimento";
import CadastroPaciente from "../pages/cadastro/paciente";
import CadastroProfissional from "../pages/cadastro/profissional";
import CadastroProcedimento from "../pages/cadastro/procedimento";
import Categoria from "../pages/cadastro/categoria";
import PesquisarPacientes from "../pages/pesquisar/paciente";
import PesquisarProfissionais from "../pages/pesquisar/profissional";
import PesquisarProcedimentos from "../pages/pesquisar/procedimento";
import PesquisarCategorias from "../pages/pesquisar/categoria";
import DashBoard from "../pages/Main";
import Login from "../pages/login";

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Login} />

    <Route path="/dashboard" exact component={DashBoard} isPrivate />
    <Route path="/atendimento" exact component={Atendimento} isPrivate />
    <Route path="/atendimento/:id" exact component={Atendimento} isPrivate />

    <Route
      exact
      path="/cadastro-paciente"
      component={CadastroPaciente}
      isPrivate
    />
    <Route
      exact
      path="/cadastro-paciente/:id"
      component={CadastroPaciente}
      isPrivate
    />
    <Route
      exact
      path="/cadastro-profissional"
      component={CadastroProfissional}
      isPrivate
    />
    <Route
      exact
      path="/cadastro-profissional/:id"
      component={CadastroProfissional}
      isPrivate
    />
    <Route
      exact
      path="/cadastro-procedimento"
      component={CadastroProcedimento}
      isPrivate
    />
    <Route
      exact
      path="/cadastro-procedimento/:id"
      component={CadastroProcedimento}
      isPrivate
    />
    <Route exact path="/cadastro-categoria" component={Categoria} isPrivate />
    <Route
      exact
      path="/cadastro-categoria/:id"
      component={Categoria}
      isPrivate
    />
    <Route
      path="/pesquisar-pacientes"
      component={PesquisarPacientes}
      isPrivate
    />
    <Route
      path="/pesquisar-profissionais"
      component={PesquisarProfissionais}
      isPrivate
    />
    <Route
      path="/pesquisar-procedimentos"
      component={PesquisarProcedimentos}
      isPrivate
    />
    <Route
      path="/pesquisar-categorias"
      component={PesquisarCategorias}
      isPrivate
    />
  </Switch>
);

export default Routes;
