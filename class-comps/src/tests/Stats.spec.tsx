import React from "react";
import {StatsInterface} from "../fetch/fetch.tsx";
import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {store} from "../main.tsx";
import Stats from "../components/StatsComp.tsx";

const stat: StatsInterface = {
    base_stat: 60,
    stat: {
        name: 'hp'
    }
}

describe('stats comp', () => {
    it('render', () => {
        render(
            <Provider store={store}>
                <Stats base_stat={stat.base_stat} stat={stat.stat} />
            </Provider>
        );

        expect(screen.getByText(/hp/i)).toBeInTheDocument();
    })
})