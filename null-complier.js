function noop() {
    return null;
}

require.extensions['.svg'] = noop;
require.extensions['.less'] = noop;
require.extensions['.css'] = noop;