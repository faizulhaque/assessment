import Axios from "axios";
import { ForkUser, Gist } from "./models/Gist";

export class GitService {
  async getGistDataByUsername(username: string): Promise<Gist[]> {
    // TODO: Can be added try catch to handle api exceptions.

    return (await Axios.get(`https://api.github.com/users/${username}/gists`))
      .data as Gist[];
  }

  async getForkUsersDataByUrl(url: string): Promise<ForkUser[]> {
    return (await Axios.get(url)).data as ForkUser[];
  }
}
