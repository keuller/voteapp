function VoteCtrl() {
    var vm = this;
    vm.votes = data;

    vm.sort = function() {
        vm.votes.sort(function(a, b) {
            if (a.count > b.count) return -1;
            if (a.count < b.count) return 1;
            return 0;
        });
    };

    vm.doIncrement = function(item) {
        var vote = this.votes.filter(function(obj) {
            return (obj.id === item.id);
        });
        vote[0].count = vote[0].count + 1;
        vm.sort();
    };

    vm.doDecrement = function(item) {
        var vote = this.votes.filter(function(obj) {
            return (obj.id === item.id);
        });
        if (vote[0].count > 0)
            vote[0].count = vote[0].count - 1;
        vm.sort();
    };
}

angular.module('VoteApp', [])
       .controller('VoteCtrl', VoteCtrl);
