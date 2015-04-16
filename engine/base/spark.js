/**
 * Created by valentin on 16.04.2015.
 */

var Spark;

Spark = (function () {
    var self = {
        major: 0,
        minor: 1,
        sprint: 1,

        version: function () {
            return this.major + "." + this.minor + "." + this.sprint;
        }
    };

    return self;
})();

module.exports = Spark;