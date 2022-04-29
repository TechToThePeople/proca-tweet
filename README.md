This does sync a list of targets from proca to a twitter list and back. It allows to enrich the contact details with extra informations, like the picture of the contact or the number of supporters.

## big picture

1. The list of targets starts on airtable. it can be edited by the client and have whatever format needed.
1. a custom workflow on airtable does fetch the list, convert to what it to proca format and saves it into proca-config (into target/source/{campaign}.json
1. in proca-config ($proca/config) git pull
1. $proca node bin/pushTargets.js {campaign} does take that list and adds it as targets to the campaign (from proca)
1. $proca node bin/pullTargets.js {campaign} does take the list from the server and saves it into proca-config target/server/{campaign}.json (mostly to add the target id and the email status)
1. $proca-tweet node bin/push {campaign} takes the source from proca and push it to a twitter list
1. $proca-tweet node bin/pull {campaign} takes the list and saves it  into proca-config target/twitter/{campaign.json}
1. $proca node bin/buildTarget.json {campaign} takes the server and the twitter and build a public list into proca-config target/twitter/public/{campaign.json}
1. in proca-config: git add target + commit + push
1. $proca bash bin/n8npull.sh updates the lists to the server and the target/public one is now accessible as https://widget.proca.app/t/{campaign.json}

## airtable

clone an existing mtt workflow, for instance this one for meps:
https://workflow.proca.app/workflow/24
you need two adjust 3 things:
1. the Contacts (list) config to fetch the right table/app on airtable
2. the FunctionItem to map the airtable fields to the proca ones
3. the name of the next step and the filename where it needs to be stored (name of the campaign)

if one of the column is a reference to another table (eg list of countries, language), airtable returns an array with a single entry, you need to format it to flatten it

airtable is the source, we do not push back anything in airtable yet

## twitter list

!! we might hit various twitter restrictions, keep an eye on the errors, be ready to run multiple times

a common error is: "You aren't allowed to add members to this list. code:104" it means you have gone above quota. wait a bit before retrying
"Cannot find specified user. code:108", means that the source is incorrect and needs to be fixed as the screen_name doesn't exist

## build public list

it has various options, eg to add or not the email (for client side mtt), --meps format (to add the name of the party as description...)





