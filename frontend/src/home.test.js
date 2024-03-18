import {cleanup, fireEvent, render} from '@testing-library/react'
import Home from "./Home";
import test, { describe } from 'node:test';

describe("Testing rendering of home page", function(){
    test("Logo on homepage", function(){
        const {} = render(
            <Home />,
          );
    })
})