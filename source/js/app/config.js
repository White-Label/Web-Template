var config_module = angular.module('app.config', []);

var config_data = {
    'GENERAL_CONFIG': {
        'APP_NAME': 'White Label Template',
        'APP_VERSION': '1.0',
        'HTML_5_MODE': false,
        'WHITE_LABEL_CLIENT_ID': 'YOUR_WHITE_LABEL_CLIENT_ID_HERE',
        'SOUNDCLOUD_CLIENT_ID': 'YOUR_SOUNDCLOUD_CLIENT_ID_HERE',
        'DEFAULT_COLLECTION': 'YOUR_DEFAULT_COLLECTION_HERE'
    }
};

angular.forEach(config_data, function(key, value) {
    config_module.constant(value, key);
});
