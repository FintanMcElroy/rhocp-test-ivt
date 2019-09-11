# OpenShift Findings

It seems there are many ways to deploy to RHOCP
- S2I deploys from GitHub source so no need for Dockerfiles or YAML (but how does it know what port to expose such as 8090?)
- From Docker image does not need YAML
- nodejs apps can use nodeshift
- from YAML / JSON I believe is to do with using RHOCP Templates (their origin GH provides lots of JSON templates)
- as well as UI console you have oc and odo clis
