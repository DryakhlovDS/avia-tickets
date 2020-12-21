import {
  getAutocompleteInstance,
  getDatepickersInstance
} from '../plugins/materialize';

class FormUI{
  constructor(autoCompleteInstance, datePickerInstance){
    this._form = document.forms['locationControls'];
    this.inputDepart = document.querySelector('#autocomplete-depart');
    this.inputArrive = document.querySelector('#autocomplete-arrive');
    this.dateDepart = datePickerInstance( document.querySelector('.depart-date') );
    this.dateArrive = datePickerInstance( document.querySelector('.arrive-date') );
    this.autoCompleteDepart = autoCompleteInstance(this.inputDepart);
    this.autoCompleteArrive = autoCompleteInstance(this.inputArrive);
  }

  get form(){
    return this._form;
  }

  get inputDepartValue(){
    return this.inputDepart.value;
  }

  get inputArrivetValue(){
    return this.inputArrive.value;
  }

  get dateDepartValue(){
    return this.dateDepart.toString();
  }

  get dateArriveValue(){
    return this.dateArrive.toString();
  }

  setAutoComplete(data){
    this.autoCompleteDepart.updateData(data);
    this.autoCompleteArrive.updateData(data);
  }
}

const formUI = new FormUI(getAutocompleteInstance, getDatepickersInstance);

export default formUI;