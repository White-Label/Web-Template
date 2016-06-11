var config_module = angular.module('np.config', []);

var config_data = {
    'GENERAL_CONFIG': {
        'APP_NAME': 'Noon Pacific',
        'APP_VERSION': '1.0',
        'WHITE_LABEL_TOKEN': '***REMOVED***',
        'HTML_5_MODE': false,
        'DEFAULT_COLLECTION': 'weekly'
    }
};

angular.forEach(config_data, function(key, value) {
    config_module.constant(value, key);
});
