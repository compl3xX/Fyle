let annual_income = 0,
    extra_income = 0,
    age_group = 0,
    deduction = 0;

const taxPercentage = {
    1: 0.3,
    2: 0.4,
    3: 0.1
}

const errMap = {
    annual_income: "icon1_err",
    extra_income: "icon2_err",
    deduction: "icon3_err"
}

const annual_income_input = document.getElementById('annual_income');
const extra_income_input = document.getElementById('extra_income');
const deduction_input = document.getElementById('deduction');
const age_group_input = document.getElementById('age_group');
const modalBackdrop = document.querySelector('.modal-backdrop');
const modalContent = document.querySelector('.modal-content');
const openModalButton = document.getElementById('openModalButton');
const closeModalButton = document.getElementById('closeModalButton');
const taxToPay = document.getElementById('taxToPay')


function intialize() {
    annual_income = annual_income_input.value;
    extra_income = extra_income_input.value;
    deduction = deduction_input.value;
    age_group = age_group_input.value;


    const allInputs = document.querySelectorAll('input')

    for (let input of allInputs) {

        const inputValue = input.value.trim()

        if (inputValue === '' || isNaN(inputValue)) {
            document.getElementById(`${errMap[input.id]}`).style.visibility = 'visible'
            document.getElementById(`${errMap[input.id]}`).innerHTML = "Please fill this field with number"
        }
        else {
            document.getElementById(`${errMap[input.id]}`).style.visibility = 'hidden'
            document.getElementById(`${errMap[input.id]}`).innerHTML = "Please enter numbers only"
        }
    }

    return !(annual_income == "" || annual_income === '0' || extra_income == "" || deduction == "")
}

function isTaxApplicable(overall_income) {
    return (overall_income / 100000) <= 8;
}

function validateInput(field, err) {
    let inputValue = field.value.trim()

    if (isNaN(inputValue)) {
        err.style.visibility = "visible"
    } else {
        err.style.visibility = 'hidden'
    }

}

function refersh() {
    annual_income_input.value = ""
    extra_income_input.value = ""
    deduction_input.value = ""
    age_group_input.value = 1
}

function showResult() {
    modalBackdrop.style.visibility = 'visible';
    modalContent.style.visibility = 'visible';
}

function calTax() {

    if (!intialize()) return;

    let taxCal;

    const overall_income = parseInt(annual_income) + parseInt(extra_income) - parseInt(deduction);

    const taxed_income = (overall_income / 100000) - 8;


    if (isTaxApplicable(overall_income)) {
        taxToPay.textContent = overall_income;
        showResult()
        return;
    }

    else if (age_group < 40) taxCal = taxPercentage[age_group] * taxed_income
    else if (age_group >= 40 && age_group < 60) taxCal = taxPercentage[age_group] * taxed_income
    else taxCal = taxPercentage[age_group] * taxed_income

    taxToPay.textContent = overall_income - taxCal * 100000;

    showResult()

}


document.getElementById('submit').addEventListener('click', calTax)

annual_income_input.addEventListener('input', function () {
    validateInput(this, document.getElementById('errorIcon1'))
})

extra_income_input.addEventListener('input', function () {
    validateInput(this, document.getElementById('errorIcon2'))
})

deduction_input.addEventListener('input', function () {
    validateInput(this, document.getElementById('errorIcon3'))
})

closeModalButton.addEventListener('click', () => {
    modalBackdrop.style.visibility = 'hidden';
    modalContent.style.visibility = 'hidden';
    refersh()
});





