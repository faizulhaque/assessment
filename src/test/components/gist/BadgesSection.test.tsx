import React from "react";
import { ShallowWrapper, shallow } from "enzyme";
import BadgesSection, { IBadgeProps } from "~/components/gist/BadgesSection";

describe("InvoiceList", () => {
  let wrapper: ShallowWrapper;
  let props: IBadgeProps;

  beforeEach(() => {
    props = {
      files: { filename: { filename: "filename" } },
    };

    wrapper = shallow(<BadgesSection {...props} />, {
      disableLifecycleMethods: true,
    });
  });

  afterEach(() => {
    // TODO: if you wanna to unmount or wanna restore all mock before each test use below
    // jest.restoreAllMocks();
    // wrapper.unmount();
  });

  describe("Validate Data", () => {
    it("Verify Html rendering", () => {
      wrapper.debug();
      wrapper.html();
      expect(wrapper.find(".td-for-filename").text()).toEqual("filename");
    });
  });
});
