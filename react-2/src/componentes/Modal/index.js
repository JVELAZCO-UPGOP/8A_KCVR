import React from "react";
import ModalHeader from "./ModalHeader";
import Select from "../Select";

function Modal() {
  return (
    <div
      className="modal fade"
      id="exampleModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <ModalHeader />
          <div className="modal-body">
            <form id="form">
              <Select />
              <div className="form-row">
                <div className="col">
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    className="form-control"
                    placeholder="Nombre"
                  />
                </div>
                <div className="col">
                  <select className="form-control" id="dueno">
                    <option>Dueño</option>
                    <option>Miguel</option>
                    <option>Susan</option>
                    <option>Mario</option>
                    <option>Jose</option>
                    <option>Karen</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Cerrar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-dismiss="modal"
              id="btn-guardar"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;