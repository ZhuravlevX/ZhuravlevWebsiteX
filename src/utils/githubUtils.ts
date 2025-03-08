
import { Octokit } from "@octokit/rest";

export const GITHUB_USERNAME = "ZhuravlevX";
export const octokit = new Octokit();

export interface Commit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
}

export interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  topics: string[];
  homepage: string | null;
  has_readme?: boolean;
}

export const fetchUserData = async () => {
  try {
    const response = await octokit.users.getByUsername({
      username: GITHUB_USERNAME
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching GitHub user data:", error);
    return null;
  }
};

export const fetchRepositories = async () => {
  try {
    const response = await octokit.repos.listForUser({
      username: GITHUB_USERNAME,
      sort: "updated"
    });
    
    const reposWithReadme = await Promise.all(response.data.map(async repo => {
      try {
        await octokit.repos.getReadme({
          owner: GITHUB_USERNAME,
          repo: repo.name
        });
        return {
          ...repo,
          has_readme: true
        };
      } catch {
        return {
          ...repo,
          has_readme: false
        };
      }
    }));
    
    return reposWithReadme as Repository[];
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error);
    return [];
  }
};

export const fetchReadme = async (repoName: string) => {
  try {
    const response = await octokit.repos.getReadme({
      owner: GITHUB_USERNAME,
      repo: repoName,
      mediaType: {
        format: "raw"
      }
    });
    return Buffer.from((response.data as any).content, 'base64').toString();
  } catch (error) {
    console.error("Error fetching README:", error);
    return "No README available";
  }
};

export const fetchCommits = async (repoName: string) => {
  try {
    const response = await octokit.repos.listCommits({
      owner: GITHUB_USERNAME,
      repo: repoName,
      per_page: 10
    });
    return response.data as Commit[];
  } catch (error) {
    console.error("Error fetching commits:", error);
    return [];
  }
};
