import React from 'react';

const origin = window.location.origin;

export default {
    appBaseUrl: origin,
    endpoints: {
        login: origin + '/auth' + '/login',
        register: origin + '/auth' + '/register',
        profile: origin + '/api' + '/profile',
        recommendation: origin + '/api' + '/recommendation',
        user: origin + '/api' + '/user',
    }
}