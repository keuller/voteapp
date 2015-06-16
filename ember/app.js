const votes = data.map((item) => {
    return Ember.Object.create(item)
});

class IndexRoute extends Ember.Route {
    model() {
        return votes;
    }
}

let IndexController = Ember.ArrayController.extend({
    sort() {
        var list = this.get('content');
        list.sort((a, b) => {
            if (a.get('count') > b.get('count')) return -1;
            if (a.get('count') < b.get('count')) return 1;
            return 0;
        });
        this.set('content', Ember.copy(list, false));
    },

    actions: {
        doIncrement(vote) {
            var votes = this.get('content');
            var c = parseInt(vote.get('count'), 10);
            vote.set('count', c + 1);
            this.sort();
        },

        doDecrement(vote) {
            var votes = this.get('content');
            var c = parseInt(vote.get('count'), 10);
            if (c > 0) vote.set('count', c - 1);
            this.sort();
        }
    }
});

const VoteApp = Ember.Application.create();
VoteApp.IndexRoute = IndexRoute;
VoteApp.IndexController = IndexController;
