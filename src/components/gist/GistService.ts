import Axios from "axios";
import { IGistService } from "./IGistService";
import { Gist } from "./models/Gist";

export class GitService implements IGistService {
  async getGistDataByUsername(username: string): Promise<Gist[]> {
    // TODO: Can be added try catch to handle api exceptions.

    const response = await Axios.get<Gist[]>(
      `https://api.github.com/users/${username}/gists`
    );
    return response.data as Gist[];
  }
}
