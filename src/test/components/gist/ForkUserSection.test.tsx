import React from "react";
import { ShallowWrapper, shallow } from "enzyme";
import ForkUserSection, {
  IForkUserProps,
  IForkUserState,
} from "~/components/gist/ForkUserSection";
import { GitService } from "~components/gist/GitService";
import { ForkUser, Owner } from "~components/gist/models/Gist";

describe("InvoiceList", () => {
  let wrapper: ShallowWrapper;
  let props: IForkUserProps;

  beforeEach(() => {
    props = {
      forks_url: "",
      id: "",
    };

    wrapper = shallow(<ForkUserSection {...props} />, {
      disableLifecycleMethods: true,
    });
  });

  afterEach(() => {
    // TODO: if you wanna to unmount or wanna restore all mock before each test use below
    jest.restoreAllMocks();
    wrapper.unmount();
  });

  describe("componentDidMount -> test", () => {
    it("Mock API and test state values", async () => {
      wrapper.setProps({ forks_url: "abc" });
      const mockResposne = [
        {
          id: "1",
          owner: {
            id: "1",
            login: "abc",
          } as Owner,
        },
      ] as ForkUser[];
      const getForkUsersDataByUrlSpy = jest
        .spyOn(GitService.prototype, "getForkUsersDataByUrl")
        .mockResolvedValueOnce(Promise.resolve(mockResposne));

      const instance = wrapper.instance() as ForkUserSection;
      await instance.componentDidMount();

      const currentState = wrapper.state() as IForkUserState;

      expect(getForkUsersDataByUrlSpy).toHaveBeenCalledTimes(1);
      expect(currentState.users).toEqual(mockResposne[0].owner.login);
    });
  });
});
