let Vote = Backbone.Model.extend();

let VoteCollection = Backbone.Collection.extend({
    model: Vote,
    comparator(item) {
        return -item.get('count');
    }
});

let VoteView = Marionette.ItemView.extend({
    tagName: 'li',
    template: '#VoteItemTemplate',

    events: {
        'click .increment': 'doIncrement',
        'click .decrement': 'doDecrement'
    },

    modelEvents: {
        'change': 'onChange'
    },

    doIncrement(e) {
        var count = parseInt(this.model.get('count'), 10);
        this.model.set('count', count + 1);
    },

    doDecrement(e) {
        var count = parseInt(this.model.get('count'), 10);
        if (count > 0) this.model.set('count', count - 1);
    },

    onChange(data) {
        this.render();
        data.collection.sort();
    }
});

let VoteListView = Marionette.CollectionView.extend({
    id: 'itens',
    tagName: 'ul',
    childView: VoteView
});

let AppLayout = Marionette.LayoutView.extend({
    template: '#AppTemplate',
    regions: {
        content: '#content'
    }
});

class App extends Marionette.Application {
    initialize(options) {
        this.addRegions({ content: options.content });
        this.layout = new AppLayout({ destroyImmediate: false });
        this.content.show(this.layout);
        this.layout.showChildView('content', new VoteListView({ collection: options.data }));
    }
}

$(document).ready(() => {
    var VoteApp = new App({ content: '#app', data: new VoteCollection(data) });
    VoteApp.start();
});
