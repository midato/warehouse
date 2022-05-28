import Swal from 'sweetalert2';

export function customSuccessfulButton(title: string, icon: string, text: string) {
  return Swal.fire({
    html: `
    <div class="swal2-icono-exito">
  </div>
      <div class="swal2-texto-exito"
           style="padding: 20px; color: #006341; height: 115px; display: flex; position: relative; justify-content: center; align-items: center; text-transform: uppercase;"
      >
        <p class="col-12 textoPre">${text}</p>
      </div>
    `,
    showCloseButton: false,
    showCancelButton: false,
    focusConfirm: false,
    confirmButtonText: 'Continuar',
    allowEscapeKey: false,
    allowOutsideClick: false
  });
}

export function customFailedButton(title: string, icon: string, text: string) {
  return Swal.fire({
    html: `
      <div class="swal2-icono-exito">
        <img class="palomaExito" src="assets/images/icono-error.svg" alt="">
      </div>
      <div style="display: flex;">
        <div class="swal2-texto-exito"
             style="width: 100%; padding: 20px; color: #212529; display: flex; position: relative; justify-content: center; align-items: center; text-transform: capitalize;">
          <p class="col-12" style="margin: 0">Ocurrió algo inesperado</p>
        </div>
      </div>
      <div style="display: flex;">
        <div class="swal2-texto-exito"
             style="width: 100%; padding: 20px; color: #212529; display: flex; position: relative; justify-content: center; align-items: center; text-transform: capitalize;">
          <p class="col-12" style="margin: 0">${text}</p>
        </div>
      </div>
      <!--<div style="display: flex;" class="buttons">
        <button type="button" tabindex="0" class="btn btn-primary">Hola</button>
      </div>-->
    `,
    showCloseButton: false,
    showCancelButton: false,
    focusConfirm: false,
    confirmButtonText: 'Aceptar',
    confirmButtonColor: '#e21517',
    allowEscapeKey: false,
    allowOutsideClick: false
  });
}
