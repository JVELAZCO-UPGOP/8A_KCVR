import React from "react";
import ModalHeader from "./ModalHeader";
import Select from "../Select";
import "./Modal.css";
import Input from "../Input";
import ModalFooter from "./ModalFooter";

const tiposMascota = [
  { valor: "Perro", etiqueta: "Perro" },
  { valor: "Gato", etiqueta: "Gato" },
  { valor: "Pájaro", etiqueta: "Pájaro" },
  { valor: "Otro", etiqueta: "Otro" },
];

const duenos = [
  { valor: "Miguel", etiqueta: "Miguel" },
  { valor: "Susan", etiqueta: "Susan" },
  { valor: "Mario", etiqueta: "Mario" },
  { valor: "Jose", etiqueta: "Jose" },
  { valor: "Karen", etiqueta: "Karen" },
];

function Modal({
  cambiarModal = () => {},
  manejarInput = () => {},
  crearEntidad = () => {},
  objeto = {},
}) {
  return (
    <>
    <div className="modal">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
      <ModalHeader cambiarModal={cambiarModal} />
        <div className="modal-body">
          <form id="form">
          <div className="form-row">
                  <div className="col">
                  <Select
                      nombreCampo="tipo"
                      options={tiposMascota}
                      onChange={manejarInput}
                      placeholder="Tipo Animal"
                      value={objeto.tipo}
                    />
                  </div>
          </div>
            <div className="form-row">
              <div className="col">
              <Input
                      nombreCampo="nombre"
                      tipo="text"
                      onInput={manejarInput}
                      placeholder="Nombre"
                      value={objeto.nombre}
                    />
              </div>
              <div className="col">
              <Select
                      options={duenos}
                      nombreCampo="dueno"
                      onChange={manejarInput}
                      placeholder="Dueño"
                      value={objeto.dueno}
                    />
              </div>
            </div>
            </form>
            </div>
            <ModalFooter
              cambiarModal={cambiarModal}
              crearEntidad={crearEntidad}
            />
          </div>
        </div>
    </div>
    <div className="modal-backdrop fade show"></div>
    </>
  );
}

export default Modal;