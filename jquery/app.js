
var incrementVote = (id) => {
    data.forEach(function(item) {
        if (item.id === id) {
            item.count = (item.count + 1);
            renderList();
        }
    });
};

var incrementListener = (e) => {
    var id = parseInt(e.target.getAttribute('data-id'), 10);
    e.preventDefault();
    incrementVote(id);
};

var decrementVote = (id) => {
    data.forEach(function(item) {
        if (item.id === id && item.count > 0) {
            item.count = (item.count - 1);
            renderList();
        }
    });
};

var decrementListener = (e) => {
    var id = parseInt(e.target.getAttribute('data-id'), 10);
    e.preventDefault();
    decrementVote(id);
};

var activeListeners = (flag) => {
    if (flag) {
        $('.increment').on('click', incrementListener);
        $('.decrement').on('click', decrementListener);
        return;
    }

    $('.increment').off('click', incrementListener);
    $('.decrement').off('click', decrementListener);
};

var renderList = () => {
    //console.time('start_render');
    var source = $('#listitem').html(),
        tmpl = _.template(source);

    var list = $('#itens');
    data.sort(function(voteA, voteB) {
        if (voteA.count > voteB.count) return -1;
        if (voteA.count < voteB.count) return 1;
        return 0;
    });

    activeListeners(false);
    list.empty();
    data.forEach(function(model) {
        list.append(tmpl({ model: model }));
    });
    activeListeners(true);
    //console.timeEnd('start_render');
};

$(document).ready(function() {
    renderList();
});
