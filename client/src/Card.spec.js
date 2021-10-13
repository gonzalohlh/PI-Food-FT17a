import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Card from "../components/Card.jsx";

configure({ adapter: new Adapter() });

describe("<Card />", () => {
  describe("Estructura", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Card />);
    });
    it("Renderiza 1 <div> con toda la ifo que le llega por porps adentro", () => {
      expect(wrapper.find("div")).toHaveLength(1);
    });

    it("Renderiza 1 <img>", () => {
      expect(wrapper.find("img")).toHaveLength(1);
    });

    it("Renderiza 1 <h3>", () => {
      expect(wrapper.find("h3")).toHaveLength(1);
    });

    it("Renderiza 1 <h5>", () => {
      expect(wrapper.find("h5")).toHaveLength(1);
    });
  });
});
