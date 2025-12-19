
var listOfNumbers = [];

if(localStorage.getItem("ourContacts")!=null)
{
listOfNumbers=JSON.parse(localStorage.getItem("ourContacts"))
}
displayContacts()
Total()
var currentIndex = null;

function SaveContact() {
  if(validateFullName() && validatePhoneNumber() && validateEmailAddress()&&AddressInput.value&&GroupInput.value) {
     var imageName =imgInput.files[0].name

var contact = {
  img:imageName,
    FullName: FullNameInput.value,
    PhoneNumber: PhoneNumberInput.value,
    EmailAddress: EmailAddressInput.value,
    Address: AddressInput.value,
    Group: GroupInput.value,
    Notes: NotesInput.value
  };

  if (currentIndex === null) {
    listOfNumbers.push(contact);
  } else {
    listOfNumbers[currentIndex] = contact;
    currentIndex = null;
  }
  localStorage.setItem("ourContacts", JSON.stringify(listOfNumbers));
  clearInputs();
  displayContacts();
  }
 else
 {
 alert("please enter valid data")
 }
 Swal.fire({
  position: "center",
  icon: "success",
  title: "Your work has been saved",
  showConfirmButton: false,
  timer: 1500
});
  
}
 
       



function displayContacts() {
 
 
       var allContactsDesign = "";
  for (var i = 0; i < listOfNumbers.length; i++) {
    allContactsDesign += `
    <div class="card mb-3 p-3" style="max-width:360px">

      <div class="d-flex align-items-center mb-2">
        <img src="./images/${listOfNumbers[i].img}" class="rounded-circle me-2"
             style="width:60px;height:60px;object-fit:cover">

        <div>
          <h6 class="mb-1 fw-bold">${listOfNumbers[i].FullName}</h6>
          <p class="mb-0 text-muted">
            <i class="fa-solid fa-phone me-1"></i>
            ${listOfNumbers[i].PhoneNumber}
          </p>
        </div>
      </div>

      <p class="mb-1">
        <i class="fa-solid fa-envelope text-purble me-1"></i>
        ${listOfNumbers[i].EmailAddress}
      </p>

      <p class="mb-1">
        <i class="fa-solid fa-location-dot text-primary me-1"></i>
        ${listOfNumbers[i].Address }
      </p>

      <span class="badge bg-primary-subtle w-25 text-primary mb-2">
        ${listOfNumbers[i].Group}
      </span>

      <p>${listOfNumbers[i].Notes}</p>

      <div class="d-flex justify-content-between">
        <div>
          <i class="fa-solid fa-phone text-success me-2"></i>
          <i class="fa-solid fa-envelope text-purble"></i>
        </div>

        <div>
          <i class="fa-solid fa-trash me-2 text-secondary" onclick="DeleteContact(${i})"></i>
          <i class="fa-solid fa-pen text-secondary"
             onclick="EditContact(${i})"
             data-bs-toggle="modal"
             data-bs-target="#contactModal"></i>
              <i class="fa-solid fa-heart-pulse text-secondary" onclick="addToEmergency${i}" ></i>
             <i class="fa-solid fa-star text-secondary"onclick="addToFavorites${i}" id="star${i}"></i>
        </div>
      </div>
    </div>`;



  }
 
  document.getElementById("demo").innerHTML =allContactsDesign


 

  

}
 function Total() {
    var total = `
    <div class="d-flex bg-white px-3 py-2 mt-4 rounded-4 align-items-center gap-3">
        <i class="fa-solid fa-users-line text-white bg-primary p-2 rounded-3 w-17"></i>
        <div>
            <p class="text-secondary mb-0">Total</p>
            <p class="fw-bold mb-0">${listOfNumbers.length}</p>
        </div>
    </div>`;
    document.getElementById("Total").innerHTML = total;
}

function DeleteContact(index) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'This contact will be deleted!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      listOfNumbers.splice(index, 1);
      localStorage.setItem("ourContacts", JSON.stringify(listOfNumbers));
      displayContacts();

      Swal.fire('Deleted!', 'Contact has been deleted.', 'success');
    } 
  });
 displayContacts()
}




function EditContact(index) {
  currentIndex = index;
imgInput.value=listOfNumbers[index].img
  FullNameInput.value = listOfNumbers[index].FullName;
  PhoneNumberInput.value = listOfNumbers[index].PhoneNumber;
  EmailAddressInput.value = listOfNumbers[index].EmailAddress;
  AddressInput.value = listOfNumbers[index].Address;
  GroupInput.value = listOfNumbers[index].Group;
  NotesInput.value = listOfNumbers[index].Notes;
  localStorage.setItem("ourContacts", JSON.stringify(listOfNumbers)) 

  Swal.fire({
  title: "Do you want to save the changes?",
  showDenyButton: true,
  showCancelButton: true,
  confirmButtonText: "Save",
  denyButtonText: `Don't save`
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire("Saved!", "", "success");
  } else if (result.isDenied) {
    Swal.fire("Changes are not saved", "", "info");
  }
});
}


function search() {
  var term = searchInput.value.toLowerCase();
for(var i=0;i<listOfNumbers.length;i++)
{
  if(listOfNumbers[i].FullName.toLowerCase().includes(term.toLowerCase())||listOfNumbers[i].EmailAddress.toLowerCase().includes(term.toLowerCase())||listOfNumbers[i].PhoneNumber.includes(term))
  {
result.push(listOfNumbers[i])
  }
  displayContacts(result)
}
  

 
}

function clearInputs() {
  FullNameInput.value = "";
  PhoneNumberInput.value = "";
  EmailAddressInput.value = "";
  AddressInput.value = "";
  GroupInput.value = "";
  NotesInput.value = "";
}

function validateFullName()
{
  var FullNameRegex=/^[A-Z][a-z]+$/
 
 return FullNameRegex.test(FullNameInput.value)
 
}
function validatePhoneNumber()
{
  var PhoneNumberRegex =/^[01][2501][0-9]{9}$/
 
return PhoneNumberRegex.test(PhoneNumberInput.value)
  
}
function validateEmailAddress()
{
  var EmailAddressRegex =/^[A-Za-z][a-zA-Z0-9]+@gmail\.com$/
 
  return EmailAddressRegex.test(EmailAddressInput.value)
 
}

    




