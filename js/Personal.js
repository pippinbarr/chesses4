class Personal extends BaseChess {
    constructor() {
        super();
    }

    setup() {
        super.setup();

        $(PIECE).each(function () {
            let $label = $("<span>H</span>")
            $(this).append($label)
        });
    }
}