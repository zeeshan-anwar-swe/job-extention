import { Td, Tr } from '../../../../../components/ui/Table';
import TableDataProfilePartial from './TableDataProfile.partial';
import TableDataActionsPartial from './TableDataActions.partial';
import { calculateTotalExperience } from '../../../../../utils/linkedin.util';
import { TCustomCVUser } from '../../../../../types/slices.type/agency/custom-cv.slice.type';
import { motion, AnimatePresence } from 'framer-motion';

const variants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20, transition: { duration: 0.9 } }
};

const TableRowPartial = ({ candidate }: { candidate: TCustomCVUser }) => {
    return (
        <AnimatePresence>
            <motion.tr
                key={candidate.id} // Important: AnimatePresence requires a unique key for each child
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
            >
                <Td>
                    <TableDataProfilePartial
                        image={candidate?.profilePictureUrl}
                        title={candidate?.name}
                        subTitle={candidate?.headline}
                    />
                </Td>

                <Td className='text-center'>{candidate?.industry}</Td>
                <Td className='text-center'>{candidate?.location}</Td>
                <Td className='text-center'>{calculateTotalExperience(candidate?.workExperience)}</Td>

                <Td colSpan={2}>
                    <TableDataActionsPartial candidate={candidate} />
                </Td>
            </motion.tr>
        </AnimatePresence>
    );
};

export default TableRowPartial;