export const APIKEY = '25b845315c9e36c469808315cbc4d0760bbe76ef8344995d79418aa22a81c6ee';
export const URL = 'https://take-home-exercise-api.herokuapp.com/meters';

// Ideally, these labels for meter types should be included in the response meta data. Hard coding the labels here as a nice-to-have.
export const METER_TYPE_LABELS = {
    'sum': 'Sum up values reported across a time interval',
    'max': 'Max value received with a time interval',
    'unique_count': 'Count only unique events'
}

export const CREATE_METER_FORM = 'CREATE';
export const UPDATE_METER_FORM = 'UPDATE';
export const DELETE_METER_FORM = 'DELETE';
export const USED_FOR_BILLING_LABEL = 'Use this meter in pricing plan as a product item. A product item will be automatically created under billing cloud.'