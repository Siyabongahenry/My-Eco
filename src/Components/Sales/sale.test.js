import Sales from ".";
import { render,screen } from "@testing-library/react";

test("on initial render sale button disabled", ()=>{
    render(<Sales/>);
    expect(screen.getByRole('button',{name:/submit/i})).toBeDisabled()
});