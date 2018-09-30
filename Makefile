.PHONY: publish*

publish: publish-js publish-py

publish-js:
	cd lib/js && npm publish

publish-py:
	cd lib/py && pipenv run build && pipenv run publish
