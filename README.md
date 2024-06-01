# tinder-from-wish
If Tinder was built by Wish

## Description
A cheap Tinder web app, it's a monolithic aplication built using React + Typescript + Express JS + SQLite

## How to Run
Pre-requisites:
1. node package manager (NPM)
2. A computer

In /tinder-app directory:
1. npm install
2. npm start

## Data Structure
There are three data objects, User, Profile and Recommendation.
1. User: username and password for authentication stuffs
2. Profile: user's bio information for the cheap matching algorithm
3. Recommendation: store the matches generated by the the cheap matching algorithm

[![](https://mermaid.ink/img/pako:eNp9U9FOgzAU_ZXmPmncFthgIDE--QFG44tZYhq4Y420JbdFnXP_7t3YnCCTp_ac09PTU7qB3BYIGeSVdO5OyZKkXhjB35NDEpm4UsYLVXQx50mZUjQ8NVJjl3xsyZoN3y39WslcZUtlLi47GGGpnEfqwUtlih5UsW4HteA92aWqsBfxhB5CngL-oUo0BdIZsrK59MqaM3Rj1BuSU359RsChkNB5N5R219zL38g5ofR4PPUJb-rigP-q-mY8PkqO-APmVms-1T55r5lBshNkUFG3W_wvcrkl_If3SnMVUtdnNIM3K8bjr9tTC1r6fIVOvCu_EtavuIJDNjewrL9FW62gDswLYQQaSUtV8CvY7IwWwN78z0DGw0LS6wIWZss62Xj7uDY5ZJ4aHAHZplxBtpSV41l7R4cn9IPW0kC2gQ_I4vkknkdhOE3COA2SYBaPYA1ZGkzCWTJPo3B2HSVJHG5H8GktOwST63gazuMojaJpGgVxurd73pN7--03cMw4_g?type=png)](https://mermaid.live/edit#pako:eNp9U9FOgzAU_ZXmPmncFthgIDE--QFG44tZYhq4Y420JbdFnXP_7t3YnCCTp_ac09PTU7qB3BYIGeSVdO5OyZKkXhjB35NDEpm4UsYLVXQx50mZUjQ8NVJjl3xsyZoN3y39WslcZUtlLi47GGGpnEfqwUtlih5UsW4HteA92aWqsBfxhB5CngL-oUo0BdIZsrK59MqaM3Rj1BuSU359RsChkNB5N5R219zL38g5ofR4PPUJb-rigP-q-mY8PkqO-APmVms-1T55r5lBshNkUFG3W_wvcrkl_If3SnMVUtdnNIM3K8bjr9tTC1r6fIVOvCu_EtavuIJDNjewrL9FW62gDswLYQQaSUtV8CvY7IwWwN78z0DGw0LS6wIWZss62Xj7uDY5ZJ4aHAHZplxBtpSV41l7R4cn9IPW0kC2gQ_I4vkknkdhOE3COA2SYBaPYA1ZGkzCWTJPo3B2HSVJHG5H8GktOwST63gazuMojaJpGgVxurd73pN7--03cMw4_g)

## Sequence Diagram
### Authorization Endpoints
[![](https://mermaid.ink/img/pako:eNqtkl9v2jAUxb_K1X1qp4wlkJDUUkGIZdokNqoEWqnKi5V4EDWxqf9o7RDffXYoqF277qF9inPvOT9fH90tlqJiSFCxW8N4yT7XdCVpW3CADZW6LusN5RqWism_a5kw-nl1YvR6KriWommed_PbpuCu6IAfR6M9g8DFPF_AJ8lWtXpg7jtW8hRI4CByhJNTJ32qsBZ7C4FvP_I0W9jPYg7GahVcTmbLND8ZezDufFb2At9xoaKavog-DJx1U0iqa8FBmbJkSnmgxQ3jXnfdEXF8iAM7o9oIrhj8qvV6bwDKKyglo5pVj73_zKkRq5q_GlKn-F9CeTpLpwv4AF-y-feHjK6-plnanTltGZzD-K1Jzdwo7xLR0YMetky2tK7s5m4doUC9Zi0rkNhjReVNgQXfWR01WuT3vESipWEeSmFWayQ_aaPsn9lY3GHnj1W7qUi2eIckGvaiYRgE_TiIEj_2B5GH90gSvxcM4mESBoOzMI6jYOfhbyEswe-dRf1gGIVJGPaT0I-SDnfdNd0Euz9Ffytd?type=png)](https://mermaid.live/edit#pako:eNqtkl9v2jAUxb_K1X1qp4wlkJDUUkGIZdokNqoEWqnKi5V4EDWxqf9o7RDffXYoqF277qF9inPvOT9fH90tlqJiSFCxW8N4yT7XdCVpW3CADZW6LusN5RqWism_a5kw-nl1YvR6KriWommed_PbpuCu6IAfR6M9g8DFPF_AJ8lWtXpg7jtW8hRI4CByhJNTJ32qsBZ7C4FvP_I0W9jPYg7GahVcTmbLND8ZezDufFb2At9xoaKavog-DJx1U0iqa8FBmbJkSnmgxQ3jXnfdEXF8iAM7o9oIrhj8qvV6bwDKKyglo5pVj73_zKkRq5q_GlKn-F9CeTpLpwv4AF-y-feHjK6-plnanTltGZzD-K1Jzdwo7xLR0YMetky2tK7s5m4doUC9Zi0rkNhjReVNgQXfWR01WuT3vESipWEeSmFWayQ_aaPsn9lY3GHnj1W7qUi2eIckGvaiYRgE_TiIEj_2B5GH90gSvxcM4mESBoOzMI6jYOfhbyEswe-dRf1gGIVJGPaT0I-SDnfdNd0Euz9Ffytd)

### Profile Endpoints
[![](https://mermaid.ink/img/pako:eNrFlGFv2jAQhv_KyZ9gYoxAAqmltUI02yq1AxFYpSnSZMUHWAs2tZ2uDPHf5ySsFaVIVNpUKVLi1773zs_F3pBUcSSUGLzLUaZ4Kdhcs2UiAVZMW5GKFZMWpgb1c22scnuoXpl-bhconcAs8hvBeYa3TOPzhSOtZiLDgZJWqyw7dIrvskQWYpH8_fl5lY_C52gCH1ZVdDFd6W7B0dQU5mh3-Wq5c7vi9SLyaIAzOyiPgphBTeyH1Op1kPhga6XfQYzzcbugEEfX0WAC7-DTeHgDu9oN3H6JxhEUBf0QHD7CRWHiAl5Ov5OAM8uOZXtkhBZMnqZozB6iAiWFMZqVkgbhl7CLv-XsfF8APhrGryeeanTSW0K_-hpH44l7TYZPyL_1r6dRDLWLBuw99X-GflBu_GT6FSd-Qhemr29CvuJv3ITp6LI_iZ74x-7wSrbE4m9vuGMpOerqO1POVyhZjXIp7lEbYdfVWEi3WTTWFMP_eHCmJbGTu1cB3u8eaZAl6iUT3N2rm8IiIQ7cEhNC3Sdn-mdCErl161huVbyWKaFW59ggWuXzBaEzlhk3qsx3N_Kj6u5GQjfkgdCg2wy6vue1e14QtnqtTtAga0LDVtPr9Lqh73XO_F4v8LYN8lsp59BqngVtrxv4oe-3Q78VhKXd93KytN_-AXLwGS8?type=png)](https://mermaid.live/edit#pako:eNrFlGFv2jAQhv_KyZ9gYoxAAqmltUI02yq1AxFYpSnSZMUHWAs2tZ2uDPHf5ySsFaVIVNpUKVLi1773zs_F3pBUcSSUGLzLUaZ4Kdhcs2UiAVZMW5GKFZMWpgb1c22scnuoXpl-bhconcAs8hvBeYa3TOPzhSOtZiLDgZJWqyw7dIrvskQWYpH8_fl5lY_C52gCH1ZVdDFd6W7B0dQU5mh3-Wq5c7vi9SLyaIAzOyiPgphBTeyH1Op1kPhga6XfQYzzcbugEEfX0WAC7-DTeHgDu9oN3H6JxhEUBf0QHD7CRWHiAl5Ov5OAM8uOZXtkhBZMnqZozB6iAiWFMZqVkgbhl7CLv-XsfF8APhrGryeeanTSW0K_-hpH44l7TYZPyL_1r6dRDLWLBuw99X-GflBu_GT6FSd-Qhemr29CvuJv3ITp6LI_iZ74x-7wSrbE4m9vuGMpOerqO1POVyhZjXIp7lEbYdfVWEi3WTTWFMP_eHCmJbGTu1cB3u8eaZAl6iUT3N2rm8IiIQ7cEhNC3Sdn-mdCErl161huVbyWKaFW59ggWuXzBaEzlhk3qsx3N_Kj6u5GQjfkgdCg2wy6vue1e14QtnqtTtAga0LDVtPr9Lqh73XO_F4v8LYN8lsp59BqngVtrxv4oe-3Q78VhKXd93KytN_-AXLwGS8)

### Recommendation Endpoints
[![](https://mermaid.ink/img/pako:eNqNk8Fu2zAMhl-F08kBssxO7NjVoUCwDUMOu6wrBgy-qBaTCLOllJKxeEHefXSCFXCMrL3ZpP6PPynqKCqnUUjh8blFW-Eno7akmtIC7BUFU5m9sgEePdJ17Jtrwzi69qs27NByQAXUX43WNf5QhCM5Vq5p0GoVjLMfnQ3k6noMfHiuS9sHew_v7-8vZSV8-fwdPtAA0p-6pPncTSMSauPDsLyPJr34pqave8OvBLOByAyV0WQCFg_hgr0lZSp3JyHi2VMHjTpAEsOwJw8bR1C1RAwHrTpQVoMjjQRPHfjKEZ6LMOm_LldELL6Cv8Ud9xe9u9LNarTbsJvAFi0Sd7yyem35gkZzbTm41m9yOMxwr0G94u9lFzCAb6sKvR_sQL8yPdfv2QrCbxN2o_H2ZcRUNEiNMpqfwrFHlIJvs8FSSP7Uin6VorQnPqfa4B46WwkZqMWpINdud0JuVO35r90z7t8jeonyHgt5FAchs-UsW6ZJMs-TrIjzeJFNRSdkEc-SRb4s0mRxl-Z5lpym4o9zTIhnd9k8WWZpkabzIo2z4oz7eU6e8ae_B5JWiw?type=png)](https://mermaid.live/edit#pako:eNqNk8Fu2zAMhl-F08kBssxO7NjVoUCwDUMOu6wrBgy-qBaTCLOllJKxeEHefXSCFXCMrL3ZpP6PPynqKCqnUUjh8blFW-Eno7akmtIC7BUFU5m9sgEePdJ17Jtrwzi69qs27NByQAXUX43WNf5QhCM5Vq5p0GoVjLMfnQ3k6noMfHiuS9sHew_v7-8vZSV8-fwdPtAA0p-6pPncTSMSauPDsLyPJr34pqave8OvBLOByAyV0WQCFg_hgr0lZSp3JyHi2VMHjTpAEsOwJw8bR1C1RAwHrTpQVoMjjQRPHfjKEZ6LMOm_LldELL6Cv8Ud9xe9u9LNarTbsJvAFi0Sd7yyem35gkZzbTm41m9yOMxwr0G94u9lFzCAb6sKvR_sQL8yPdfv2QrCbxN2o_H2ZcRUNEiNMpqfwrFHlIJvs8FSSP7Uin6VorQnPqfa4B46WwkZqMWpINdud0JuVO35r90z7t8jeonyHgt5FAchs-UsW6ZJMs-TrIjzeJFNRSdkEc-SRb4s0mRxl-Z5lpym4o9zTIhnd9k8WWZpkabzIo2z4oz7eU6e8ae_B5JWiw)
