import { IFormValues } from './CreateRequest';

export const validateForm = (values: IFormValues) => {
    const errors: Record<string, string> = {};

    if (values['part-serial-number']?.length < 6) {
        errors['part-serial-number'] = 'It should be at least six characters';
    }

    if (values['part-serial-number']?.length > 10) {
        errors['part-serial-number'] = 'It should be at most ten characters';
    }

    if (values['invoice-number'] > 999999) {
        errors['invoice-number'] = 'It should be at most six characters';
    }

    if (values.comments && values.comments.length > 240) {
        errors.comments = 'It should be at most 240 characters'
    }

    return errors;
}