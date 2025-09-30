import Container from '../../../../components/layouts/Container/Container';
import PageWrapper from '../../../../components/layouts/PageWrapper/PageWrapper';

import Subheader, {
    SubheaderLeft,
} from '../../../../components/layouts/Subheader/Subheader';
import Header, { HeaderLeft, HeaderRight } from '../../../../components/layouts/Header/Header';
import DefaultHeaderRightCommon from '../../../../templates/layouts/Headers/_common/DefaultHeaderRight.common';
import Button from '../../../../components/ui/Button';
import Breadcrumb from '../../../../components/layouts/Breadcrumb/Breadcrumb';
import Card, { CardBody, CardHeader, CardHeaderChild, CardTitle } from '../../../../components/ui/Card';


const BlogsPage = () => {
  

    return (
        <>
            <Header>
                <HeaderLeft>
                    <Breadcrumb path='Pages / Blogs' currentPage='Manage Blogs' />
                </HeaderLeft>
                <HeaderRight>
                    <DefaultHeaderRightCommon />
                </HeaderRight>
            </Header>
            <PageWrapper name='Blogs'>
                <Subheader>
                    <SubheaderLeft>
                        <Button
                            iconSize='text-5xl'
                            rightIcon='HeroMicrophone'
                            borderWidth='border'
                            color='zinc'
                            variant='outline'
                            rounded='rounded-full'
                            icon='CustomKoalaHead'>
                            Search with KoalaByte Talking Avatar
                        </Button>

                        <Button
                            borderWidth='border'
                            color='zinc'
                            variant='outline'
                            rounded='rounded-full'
                            icon='HeroBarFilter'>
                            Filter
                        </Button>
                    </SubheaderLeft>
                </Subheader>
                <Container>
                    <Card>
                        hello
                    </Card>
                </Container>
            </PageWrapper>
        </>
    );
};

export default BlogsPage;
