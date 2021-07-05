import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import TagChecker from '../tag-checker';
import userEvent from '@testing-library/user-event';


test("tag checker - success 1", () => {
    render(<TagChecker />);

    const inputText = screen.getByTestId("text-para");
    const buttonSubmit = screen.getByTestId('submit');
    expect(inputText).toBeInTheDocument();

    userEvent.type(inputText, "The following text<C><B>is centred and in boldface</B></C>");
    expect(buttonSubmit).toBeInTheDocument();
    fireEvent.click(buttonSubmit);

    expect(screen.getByTestId("message-text")).toHaveTextContent("Correctly tagged paragraph");


});
test("tag checker success 2", () => {
    render(<TagChecker />);

    const inputText = screen.getByTestId("text-para");
    const buttonSubmit = screen.getByTestId('submit');
    expect(inputText).toBeInTheDocument();

    userEvent.type(inputText, "<B>This <\\g>is <B>boldface</B> in <<*> a</B> <\\6> <<d>sentence");
    expect(buttonSubmit).toBeInTheDocument();
    fireEvent.click(buttonSubmit);

    expect(screen.getByTestId("message-text")).toHaveTextContent("Correctly tagged paragraph");


});
test("tag checker - expected <expected> but found <unexpected>”", () => {
    render(<TagChecker />);

    const inputText = screen.getByTestId("text-para");
    const buttonSubmit = screen.getByTestId('submit');
    expect(inputText).toBeInTheDocument();

    userEvent.type(inputText, `<B><C> This should be centred and in boldface, but the
tags are wrongly nested </B></C>`);
    expect(buttonSubmit).toBeInTheDocument();
    fireEvent.click(buttonSubmit);

    expect(screen.getByTestId("message-text")).toHaveTextContent("Expected </C> found </B>");


});
test("tag checker - expected undefined but found something", () => {
    render(<TagChecker />);

    const inputText = screen.getByTestId("text-para");
    const buttonSubmit = screen.getByTestId('submit');
    expect(inputText).toBeInTheDocument();

    userEvent.type(inputText, `<B>This should be in boldface, but there is an extra closing
tag</B></C>`);
    expect(buttonSubmit).toBeInTheDocument();
    fireEvent.click(buttonSubmit);

    expect(screen.getByTestId("message-text")).toHaveTextContent("Expected # found </C>");


});

test("tag checker - expected something but found undefined", () => {
    render(<TagChecker />);

    const inputText = screen.getByTestId("text-para");
    const buttonSubmit = screen.getByTestId('submit');
    expect(inputText).toBeInTheDocument();

    userEvent.type(inputText, `<B><C>This should be centred and in boldface, but there is
a missing closing tag</C>`);
    expect(buttonSubmit).toBeInTheDocument();
    fireEvent.click(buttonSubmit);

    expect(screen.getByTestId("message-text")).toHaveTextContent("Expected </B> found #");


});

