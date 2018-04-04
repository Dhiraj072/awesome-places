// val: value to be validated
// rules: validation rules of the form
// validationRules: {
//      xxx: xxx,
//      minLength: 6,
// },
// connectedValue: any value connected to the rule

const validate = (val, rules, connectedValue) => {
    let isValid = true;
    for (const rule in rules) {
        if (Object.prototype.hasOwnProperty.call(rules, rule)) {
            switch (rule) {
            case 'isEmail':
                isValid = isValid && emailValidator(val);
                break;
            case 'minLength':
                isValid = isValid && minLengthValidator(val, rules[rule]);
                break;
            case 'equalTo':
                isValid = isValid && equalToValidator(val, connectedValue[rule]);
            default:
                break;
            }
        }
    }
    return isValid;
};

const emailValidator = (email) => {
    const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    return re.test(String(email).toLowerCase());
};

const minLengthValidator = (val, minLength) => {
    console.log(val, minLength);
    console.log(val.length >= minLength);
    return val.length >= minLength;
};

const equalToValidator = (val, confirmValue) => val === confirmValue;

export default validate;

