function propertyExistsInQuery(req, propertyName) {
    if (!req) {
        return false;
    }

    if (!req.query) {
        return false;
    }

    return req.query.hasOwnProperty(propertyName);
}

function propertyExistsInBody(req, propertyName) {
    if (!req) {
        return false;
    }

    if (!req.body) {
        return false;
    }

    return req.body.hasOwnProperty(propertyName);
}

function getPropertyFromQuery(req, propertyName) {
    if (!propertyExistsInQuery(req, propertyName)) {
        return undefined;
    }

    return req.query[propertyName];
}

function getPropertyFromBody(req, propertyName) {
    if (!propertyExistsInBody(req, propertyName)) {
        return undefined;
    }

    return req.body[propertyName];
}

function getProperty(req, propertyName) {
    if (propertyExistsInQuery(req, propertyName)) {
        return getPropertyFromQuery(req, propertyName);
    } else if (propertyExistsInBody(req, propertyName)) {
        return getPropertyFromBody(req, propertyName);
    } else {
        return undefined;
    }
}

module.exports.getProperty = getProperty;
