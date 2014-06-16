(function (Modernizr) {
    var angularApp = 'stcc',
        commonProduction = ['/dist/common.min.js'],
        indexProduction = ['/dist/index.min.js'],
        appProduction = ['/dist/app.min.js'],
        isProduction = commonProduction[0].match(/dist\/common\.min\.js/) === null,
        IE8_TEST = Modernizr.video,
        i;

    var commonDependencies = [
            'common', 'jquery'
        ],
        indexDependencies = [
            'vendor/jquery.unveil.min', 'vendor/bootstrap'
        ],
        appDependencies = [];

    for (i = 0; i < commonDependencies.length; i++) {
        commonDependencies[i] = 'js/vendor/' + commonDependencies[i] + '.js';
    }

    for (i = 0; i < indexDependencies.length; i++) {
        indexDependencies[i] = 'js/' + indexDependencies[i] + '.js';
    }

    for (i = 0; i < appDependencies.length; i++) {
        appDependencies[i] = 'js/' + appDependencies[i] + '.js';
    }

    if (isProduction) {
        commonDependencies = commonProduction;
        indexDependencies = indexProduction;

        if (appDependencies.length !== 0) {
            appDependencies = appProduction;
        }
    }

    Modernizr.load([
        {
            test: IE8_TEST,
            nope: 'js/vendor/json3.js'
        },
        {
            test: Modernizr.mq('only all'),
            nope: 'js/vendor/respond.js'
        },
        {
            load: commonDependencies,
            complete: function () {
                $(document).ready(function () {
                    // Mix in non-conflict functions to Underscore namespace if you want
                    _.mixin(_.str.exports());

                    Modernizr.load({ load: indexDependencies.concat(appDependencies), complete: initializeAngular });

                    function initializeAngular() {
                        $('img').unveil(200, function () {
                            $(this).load(function() {
                                this.style.opacity = 1;
                            });
                        });

                        $('.landing--more').on('click', function () {
                            $('html,body').animate({
                                scrollTop: $('.about > h2').offset().top - 20
                            }, 1000);
                        });

                        $('.geomicon-house').on('click', function () {
                            $('html,body').animate({
                                scrollTop: $('#what-is-health-home').offset().top - 20
                            }, 1000);
                        });

                        $('.geomicon-medkit').on('click', function () {
                            $('html,body').animate({
                                scrollTop: $('#who-eligible').offset().top - 20
                            }, 1000);
                        });

                        $('.geomicon-people').on('click', function () {
                            $('html,body').animate({
                                scrollTop: $('#staff-help').offset().top - 20
                            }, 1000);
                        });
                    }
                });
            }
        },
        {
            test: Modernizr.placeholder,
            nope: 'js/vendor/jquery.placeholder.js',
            callback: function (url, result, key) {
                if (!result) {
                    $('input, textarea').placeholder();
                }
            }
        }
    ]);
})(Modernizr);
